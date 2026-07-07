import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/** Runtime pixel IDs — Easypanel env vars apply without a frontend rebuild. */
export async function GET() {
  return NextResponse.json({
    meta: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || '',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.trim() || '',
    snap: process.env.NEXT_PUBLIC_SNAP_PIXEL_ID?.trim() || '',
  });
}
