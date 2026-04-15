import { NextRequest } from 'next/server';
import PostController from '@/modules/posts/controllers/PostController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return PostController.getPostById(req, { params });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return PostController.updatePost(req, { params });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return PostController.deletePost(req, { params });
}
