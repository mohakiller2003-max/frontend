export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'skinouva-frontend',
    buildId: process.env.NEXT_PUBLIC_BUILD_ID || 'local-dev',
    aboutFounder: true,
    packAzelaicV2: true,
  });
}
