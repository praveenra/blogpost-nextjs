import { NextResponse } from 'next/server';

// Handle CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'API is working!',
      timestamp: new Date().toISOString(),
    },
    { status: 200, headers }
  );
}

export async function OPTIONS() {
  return new Response(null, { headers, status: 200 });
}
