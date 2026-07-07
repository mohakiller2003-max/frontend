'use client';

import { firstNameForPixels, phoneFormatsForPixels } from '@/lib/phonePixels';

type PixelEventParams = Record<string, unknown>;

export type PixelUser = {
  phone?: string;
  name?: string;
};

type QueuedEvent = {
  name: string;
  params: PixelEventParams;
  eventId: string;
  user?: PixelUser;
};

type StandardEventName = 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase';

const queue: QueuedEvent[] = [];
let loaded = false;

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '';
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID || '';

const TIKTOK_EVENT_MAP: Record<StandardEventName, string> = {
  ViewContent: 'ViewContent',
  AddToCart: 'AddToCart',
  InitiateCheckout: 'InitiateCheckout',
  Purchase: 'CompletePayment',
};

const SNAP_EVENT_MAP: Record<StandardEventName, string> = {
  ViewContent: 'VIEW_CONTENT',
  AddToCart: 'ADD_CART',
  InitiateCheckout: 'START_CHECKOUT',
  Purchase: 'PURCHASE',
};

function applyPixelUser(user?: PixelUser) {
  if (!user?.phone) return;
  const formats = phoneFormatsForPixels(user.phone);
  if (!formats) return;
  const fn = user.name ? firstNameForPixels(user.name) : undefined;

  if (META_PIXEL_ID && (window as unknown as { fbq?: Function }).fbq) {
    try {
      (window as unknown as { fbq: Function }).fbq('init', META_PIXEL_ID, {
        ph: formats.meta,
        ...(fn ? { fn } : {}),
      });
    } catch {}
  }

  if (TIKTOK_PIXEL_ID && (window as unknown as { ttq?: { identify: Function } }).ttq?.identify) {
    try {
      (window as unknown as { ttq: { identify: Function } }).ttq.identify({
        phone_number: formats.tiktok,
      });
    } catch {}
  }

  if (SNAP_PIXEL_ID && (window as unknown as { snaptr?: Function }).snaptr) {
    try {
      (window as unknown as { snaptr: Function }).snaptr('init', SNAP_PIXEL_ID, {
        user_phone_number: formats.snap,
      });
    } catch {}
  }
}

function metaParams(name: StandardEventName, params: PixelEventParams): PixelEventParams {
  const base: PixelEventParams = {
    currency: params.currency || 'AED',
    content_type: 'product',
  };

  if (name === 'ViewContent' || name === 'AddToCart') {
    return {
      ...base,
      content_ids: params.content_ids,
      content_name: params.content_name,
      value: params.value,
    };
  }

  if (name === 'InitiateCheckout') {
    return {
      ...base,
      content_ids: params.content_ids,
      value: params.value,
      num_items: params.num_items,
    };
  }

  return {
    ...base,
    value: params.value,
    content_ids: params.content_ids,
    contents: params.contents,
    num_items: params.num_items,
    order_id: params.order_id,
  };
}

function tiktokParams(name: StandardEventName, params: PixelEventParams, eventId: string): PixelEventParams {
  const contents = Array.isArray(params.contents)
    ? (params.contents as { id: string; quantity: number }[]).map((item) => ({
        content_id: item.id,
        content_type: 'product',
        quantity: item.quantity,
      }))
    : params.content_ids
      ? (params.content_ids as string[]).map((id) => ({ content_id: id, content_type: 'product', quantity: 1 }))
      : [];

  return {
    contents,
    value: params.value,
    currency: params.currency || 'AED',
    content_type: 'product',
    event_id: eventId,
  };
}

function snapParams(name: StandardEventName, params: PixelEventParams, eventId: string): PixelEventParams {
  const snap: PixelEventParams = {
    currency: params.currency || 'AED',
    client_dedup_id: eventId,
  };

  if (params.value != null) snap.price = params.value;
  if (Array.isArray(params.content_ids)) snap.item_ids = params.content_ids;
  if (params.num_items != null) snap.number_items = params.num_items;

  if (name === 'Purchase') {
    snap.transaction_id = params.order_id || eventId;
  }

  return snap;
}

const STANDARD_EVENTS = new Set<StandardEventName>([
  'ViewContent',
  'AddToCart',
  'InitiateCheckout',
  'Purchase',
]);

function isStandardEvent(name: string): name is StandardEventName {
  return STANDARD_EVENTS.has(name as StandardEventName);
}

function flushCustomEvent(name: string, params: PixelEventParams, eventId: string, user?: PixelUser) {
  applyPixelUser(user);
  if (META_PIXEL_ID && (window as unknown as { fbq?: Function }).fbq) {
    try {
      (window as unknown as { fbq: Function }).fbq('track', name, params, { eventID: eventId });
    } catch {}
  }
}

function flushEvent(event: QueuedEvent) {
  const { name, params, eventId, user } = event;

  if (!isStandardEvent(name)) {
    flushCustomEvent(name, params, eventId, user);
    return;
  }

  applyPixelUser(user);

  if (META_PIXEL_ID && (window as unknown as { fbq?: Function }).fbq) {
    try {
      (window as unknown as { fbq: Function }).fbq('track', name, metaParams(name, params), { eventID: eventId });
    } catch {}
  }

  if (TIKTOK_PIXEL_ID && (window as unknown as { ttq?: { track: Function } }).ttq) {
    try {
      const ttName = TIKTOK_EVENT_MAP[name];
      (window as unknown as { ttq: { track: Function } }).ttq.track(ttName, tiktokParams(name, params, eventId));
    } catch {}
  }

  if (SNAP_PIXEL_ID && (window as unknown as { snaptr?: Function }).snaptr) {
    try {
      const snapName = SNAP_EVENT_MAP[name];
      (window as unknown as { snaptr: Function }).snaptr('track', snapName, snapParams(name, params, eventId));
    } catch {}
  }
}

export function firePixelEvent(
  name: string,
  params: PixelEventParams,
  eventId: string,
  user?: PixelUser,
) {
  if (typeof window === 'undefined') return;
  const payload: QueuedEvent = { name, params, eventId, user };

  if (loaded) {
    flushEvent(payload);
  } else {
    queue.push(payload);
  }
}

/** Load Meta/TikTok/Snap browser pixels after idle — events queue until scripts init. */
export function loadPixels() {
  if (typeof window === 'undefined' || loaded) return;
  loaded = true;

  const loadAfterIdle = (fn: () => void) => {
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(fn);
    } else {
      setTimeout(fn, 300);
    }
  };

  loadAfterIdle(() => {
    injectMetaPixel();
    injectTikTokPixel();
    injectSnapPixel();
    setTimeout(() => {
      queue.forEach(flushEvent);
      queue.length = 0;
    }, 500);
  });
}

function injectMetaPixel() {
  if (!META_PIXEL_ID) return;
  const script = document.createElement('script');
  script.text = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

function injectTikTokPixel() {
  if (!TIKTOK_PIXEL_ID) return;
  const script = document.createElement('script');
  script.text = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('${TIKTOK_PIXEL_ID}');
      ttq.page();
    }(window, document, 'ttq');
  `;
  document.head.appendChild(script);
}

function injectSnapPixel() {
  if (!SNAP_PIXEL_ID) return;
  const script = document.createElement('script');
  script.text = `
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
    snaptr('init', '${SNAP_PIXEL_ID}', {});
    snaptr('track', 'PAGE_VIEW');
  `;
  document.head.appendChild(script);
}
