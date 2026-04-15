import { NextRequest } from 'next/server';
import HealthController from '@/modules/health/controllers/HealthController';

export async function GET(req: NextRequest) {
  return HealthController.check(req);
}
