import { NextRequest } from 'next/server';
import HealthController from '@/modules/health/controllers/HealthController';

// Handle CORS //
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(req: NextRequest) {
  return HealthController.check(req);
}

export async function OPTIONS() {
  return new Response(null, { headers, status: 200 });
}
