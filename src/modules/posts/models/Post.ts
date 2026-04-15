import mongoose, { Schema } from 'mongoose';
import { IPost, IComment } from '../types';

/**
 * Comment Schema for nested comments in posts
 */
export const CommentSchema = new Schema<IComment>(
  {
    commenter: {
      type: String,
      required: [true, 'Commenter name is required'],
      minlength: [3, 'Commenter name must be at least 3 characters'],
    },
    text: {
      type: String,
      required: [true, 'Comment text is required'],
      minlength: [10, 'Comment text must be at least 10 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

/**
 * Post Schema
 */
export const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [5, 'Title must be at least 5 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      minlength: [3, 'Author name must be at least 3 characters'],
    },
    category: {
      type: String,
      enum: ['tech', 'finance', 'lifestyle'],
      required: [true, 'Category is required'],
    },
    body: {
      type: String,
      required: [true, 'Body is required'],
      minlength: [50, 'Body must be at least 50 characters'],
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'posts' }
);

/**
 * Pre-save middleware to update the updatedAt field
 */
PostSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

/**
 * Post Model
 */
const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
