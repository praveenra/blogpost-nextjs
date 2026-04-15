import { NextRequest } from 'next/server';
import PostController from '@/modules/posts/controllers/PostController';

export async function GET(req: NextRequest) {
  return PostController.getAllPosts(req);
}

export async function POST(req: NextRequest) {
  return PostController.createPost(req);
}
