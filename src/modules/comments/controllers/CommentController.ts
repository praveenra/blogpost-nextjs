import { NextRequest } from 'next/server';
import CommentService from '../services/CommentService';
import { ApiError, successResponse, errorHandler } from '@/lib/utils/apiUtils';
import { IComment, ICreateCommentRequest } from '../types';

/**
 * Comment Controller - Handles HTTP requests for comments
 */
class CommentController {
  /**
   * GET /api/posts/:id/comments - Get all comments for a post
   */
  async getCommentsByPost(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id: postId } = params;

      if (!postId) {
        throw new ApiError(400, 'Post ID is required');
      }

      const comments = await CommentService.getCommentsByPostId(postId);

      if (comments === null) {
        throw new ApiError(404, 'Post not found');
      }

      return successResponse(comments);
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * POST /api/posts/:id/comments - Add a comment to a post
   */
  async addComment(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id: postId } = params;
      const body: ICreateCommentRequest = await req.json();

      if (!postId) {
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

      const updatedPost = await CommentService.addCommentToPost(postId, comment);

      if (!updatedPost) {
        throw new ApiError(404, 'Post not found');
      }

      return successResponse(updatedPost, 201);
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * DELETE /api/posts/:postId/comments/:commentId - Delete a comment from a post
   */
  async deleteComment(_req: NextRequest, { params }: { params: { id: string; commentId: string } }) {
    try {
      const { id: postId, commentId } = params;

      if (!postId || !commentId) {
        throw new ApiError(400, 'Post ID and Comment ID are required');
      }

      const updatedPost = await CommentService.deleteCommentFromPost(postId, commentId);

      if (!updatedPost) {
        throw new ApiError(404, 'Post not found');
      }

      return successResponse({ message: 'Comment deleted successfully', post: updatedPost });
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default new CommentController();
