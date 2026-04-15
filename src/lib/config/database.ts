import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectDB(): Promise<Connection> {
  if (cachedConnection) {
    console.log('✓ Using cached database connection');
    return cachedConnection;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('📡 Connecting to MongoDB...');
    console.log('Database URL:', mongoUri.substring(0, 50) + '...');

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });

    cachedConnection = connection.connection;
    console.log('✓ Connected to MongoDB successfully!');
    return cachedConnection;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    
    // Provide helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        console.error('💡 Tip: Make sure MongoDB is running locally or check your MongoDB Atlas cluster is active');
      } else if (error.message.includes('authentication failed')) {
        console.error('💡 Tip: Check your MongoDB credentials (username/password) in .env');
      } else if (error.message.includes('querySrv')) {
        console.error('💡 Tip: Check MongoDB Atlas - your cluster might be paused or IP not whitelisted');
        console.error('   Go to: https://cloud.mongodb.com -> Security -> Network Access');
      }
    }
    
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('✓ Disconnected from MongoDB');
  }
}

export default connectDB;
