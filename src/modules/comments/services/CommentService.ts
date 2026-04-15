import Post from '../../posts/models/Post';
import { IComment } from '../types';
import { connectDB } from '@/lib/config/database';

/**
 * Comment Service - Handles comment operations related to posts
 */
class CommentService {
  /**
   * Get all comments for a specific post
   */
  async getCommentsByPostId(postId: string): Promise<IComment[] | null> {
    await connectDB();
    const post = await Post.findById(postId).select('comments').exec();
    return post?.comments || null;
  }

  /**
   * Add a comment to a post
   */
  async addCommentToPost(postId: string, comment: IComment) {
    await connectDB();
    return await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true, runValidators: true }
    ).exec();
  }

  /**
   * Delete a comment from a post (by comment ID)
   */
  async deleteCommentFromPost(postId: string, commentId: string) {
    await connectDB();
    return await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    ).exec();
  }
}

export default new CommentService();
