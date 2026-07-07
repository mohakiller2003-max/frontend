'use client';

type PixelEventParams = Record<string, unknown>;

type QueuedEvent = {
  name: string;
  params: PixelEventParams;
  eventId: string;
};

const queue: QueuedEvent[] = [];
let loaded = false;

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '';
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID || '';

// TikTok event name mapping
const TIKTOK_EVENT_MAP: Record<string, string> = {
  ViewContent: 'ViewContent',
  AddToCart: 'AddToCart',
  InitiateCheckout: 'InitiateCheckout',
  Purchase: 'CompletePayment',
};

// Snap event name mapping
const SNAP_EVENT_MAP: Record<string, string> = {
  ViewContent: 'VIEW_CONTENT',
  AddToCart: 'ADD_CART',
  InitiateCheckout: 'START_CHECKOUT',
  Purchase: 'PURCHASE',
};

function snapTrackParams(name: string, params: PixelEventParams, eventId: string): PixelEventParams {
  const snapParams: PixelEventParams = { ...params, client_dedup_id: eventId };

  if (name === 'Purchase') {
    snapParams.transaction_id = params.order_id || eventId;
    if (params.value != null) snapParams.price = params.value;
    if (Array.isArray(params.content_ids)) snapParams.item_ids = params.content_ids;
  }

  return snapParams;
}

function flushEvent(event: QueuedEvent) {
  const { name, params, eventId } = event;

  // Meta Pixel
  if (META_PIXEL_ID && typeof window !== 'undefined' && (window as unknown as { fbq?: Function }).fbq) {
    try {
      (window as unknown as { fbq: Function }).fbq('track', name, params, { eventID: eventId });
    } catch {}
  }

  // TikTok Pixel
  if (TIKTOK_PIXEL_ID && typeof window !== 'undefined' && (window as unknown as { ttq?: { track: Function } }).ttq) {
    try {
      const ttName = TIKTOK_EVENT_MAP[name] || name;
      (window as unknown as { ttq: { track: Function } }).ttq.track(ttName, { ...params, event_id: eventId });
    } catch {}
  }

  // Snapchat Pixel
  if (SNAP_PIXEL_ID && typeof window !== 'undefined' && (window as unknown as { snaptr?: Function }).snaptr) {
    try {
      const snapName = SNAP_EVENT_MAP[name] || name;
      const snapParams = snapTrackParams(name, params, eventId);
      (window as unknown as { snaptr: Function }).snaptr('track', snapName, snapParams);
    } catch {}
  }
}

export function firePixelEvent(name: string, params: PixelEventParams, eventId: string) {
  if (typeof window === 'undefined') return;
  if (loaded) {
    flushEvent({ name, params, eventId });
  } else {
    queue.push({ name, params, eventId });
  }
}

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
    // Flush queued events after a short delay to allow scripts to init
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
