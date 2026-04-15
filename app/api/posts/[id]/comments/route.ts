import { NextRequest } from 'next/server';
import PostController from '@/modules/posts/controllers/PostController';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  return PostController.addComment(req, { params });
}
