import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function errorHandler(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    // Handle Mongoose validation errors
    if (error.message.includes('validation')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
}

export function successResponse<T>(
  data: T,
  statusCode: number = 200
): NextResponse<{ success: true; data: T }> {
  return NextResponse.json({ success: true, data }, { status: statusCode });
}
