import { NextRequest } from 'next/server';
import PostService from '../services/PostService';
import { ApiError, successResponse, errorHandler } from '@/lib/utils/apiUtils';
import { IComment, ICreatePostRequest, IUpdatePostRequest, IAddCommentRequest } from '../types';

/**
 * Post Controller - Handles HTTP requests for posts
 */
class PostController {
  /**
   * GET /api/posts - Get all posts
   */
  async getAllPosts(_req: NextRequest) {
    try {
      const posts = await PostService.getAllPosts();
      return successResponse(posts);
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * GET /api/posts/:id - Get a single post
   */
  async getPostById(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;

      if (!id) {
        throw new ApiError(400, 'Post ID is required');
      }

      const post = await PostService.getPostById(id);

      if (!post) {
        throw new ApiError(404, 'Post not found');
      }

      return successResponse(post);
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * POST /api/posts - Create a new post
   */
  async createPost(req: NextRequest) {
    try {
      const body: ICreatePostRequest = await req.json();

      if (!body.title || !body.author || !body.category || !body.body) {
        throw new ApiError(400, 'Missing required fields: title, author, category, body');
      }

      const newPost = await PostService.createPost(body);
      return successResponse(newPost, 201);
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * PUT /api/posts/:id - Update a post
   */
  async updatePost(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body: IUpdatePostRequest = await req.json();

      if (!id) {
        throw new ApiError(400, 'Post ID is required');
      }

      const updatedPost = await PostService.updatePost(id, body);

      if (!updatedPost) {
        throw new ApiError(404, 'Post not found');
      }

      return successResponse(updatedPost);
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * DELETE /api/posts/:id - Delete a post
   */
  async deletePost(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;

      if (!id) {
        throw new ApiError(400, 'Post ID is required');
      }

      const deletedPost = await PostService.deletePost(id);

      if (!deletedPost) {
        throw new ApiError(404, 'Post not found');
      }

      return successResponse({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * POST /api/posts/:id/comments - Add a comment to a post
   */
  async addComment(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body: IAddCommentRequest = await req.json();

      if (!id) {
        throw new ApiError(400, 'Post ID is required');
      }

      if (!body.commenter || !body.text) {
        throw new ApiError(400, 'Missing required fields: commenter, text');
      }

      const comment: IComment = {
        commenter: body.commenter,
        text: body.text,
        createdAt: new Date(),
      };

      const updatedPost = await PostService.addComment(id, comment);

      if (!updatedPost) {
        throw new ApiError(404, 'Post not found');
      }

      return successResponse(updatedPost, 201);
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default new PostController();
