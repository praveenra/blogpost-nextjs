import { NextRequest } from 'next/server';
import PostController from '@/modules/posts/controllers/PostController';

// Handle CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(req: NextRequest) {
  return PostController.getAllPosts(req);
}

export async function POST(req: NextRequest) {
  return PostController.createPost(req);
}

export async function OPTIONS() {
  return new Response(null, { headers, status: 200 });
}
