import mongoose, { Document, Schema } from 'mongoose';

export interface IComment {
  _id?: string;
  commenter: string;
  text: string;
  createdAt?: Date;
}

export interface IPost extends Document {
  title: string;
  author: string;
  category: 'tech' | 'finance' | 'lifestyle';
  body: string;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
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

const PostSchema = new Schema<IPost>(
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

// Update the updatedAt field before saving
PostSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the model
const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
