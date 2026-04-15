import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/config/database';

/**
 * Health Check Controller - Verifies system health and database connectivity
 */
class HealthController {
  /**
   * GET /api/health - Health check endpoint
   */
  async check(_req: NextRequest) {
    try {
      console.log('🔍 Health check started...');

      // Try to connect to MongoDB
      const connection = await connectDB();

      // Check if the connection is actually active
      const isConnected = connection.readyState === 1; // 1 = connected

      return NextResponse.json(
        {
          success: true,
          status: 'healthy',
          database: {
            connected: isConnected,
            readyState: connection.readyState,
            dbName: connection.name || 'blogpost',
            host: connection.host || 'localhost',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      return NextResponse.json(
        {
          success: false,
          status: 'unhealthy',
          error: errorMessage,
          tips: {
            econnrefused: 'MongoDB is not running. Start MongoDB or use Docker.',
            querysrv: 'Check MongoDB Atlas cluster - it might be paused or IP not whitelisted.',
            authentication: 'Check MongoDB credentials in .env file.',
            enotfound: 'MongoDB Atlas hostname is incorrect or DNS cannot resolve.',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }
  }
}

export default new HealthController();
