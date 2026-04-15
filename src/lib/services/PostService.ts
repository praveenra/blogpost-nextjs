import Post, { IPost, IComment } from '@/lib/models/Post';
import { connectDB } from '@/lib/config/database';

class PostService {
  /**
   * Get all posts sorted by updatedAt descending
   */
  async getAllPosts(): Promise<IPost[]> {
    await connectDB();
    return await Post.find().sort({ updatedAt: -1 }).exec();
  }

  /**
   * Get a single post by ID
   */
  async getPostById(id: string): Promise<IPost | null> {
    await connectDB();
    return await Post.findById(id).exec();
  }

  /**
   * Create a new post
   */
  async createPost(data: Partial<IPost>): Promise<IPost> {
    await connectDB();
    const post = new Post(data);
    return await post.save();
  }

  /**
   * Update an existing post
   */
  async updatePost(id: string, data: Partial<IPost>): Promise<IPost | null> {
    await connectDB();
    return await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  /**
   * Delete a post
   */
  async deletePost(id: string): Promise<IPost | null> {
    await connectDB();
    const post = await Post.findByIdAndDelete(id).exec();
    // TODO: Send message to Azure Service Bus if needed
    return post;
  }

  /**
   * Add a comment to a post
   */
  async addComment(postId: string, comment: IComment): Promise<IPost | null> {
    await connectDB();
    return await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true, runValidators: true }
    ).exec();
  }

  /**
   * Get comments for a post
   */
  async getComments(postId: string): Promise<IComment[] | null> {
    await connectDB();
    const post = await Post.findById(postId).select('comments').exec();
    return post?.comments || null;
  }
}

export default new PostService();
