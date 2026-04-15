import { Document } from 'mongoose';

/**
 * Comment interface for posts
 */
export interface IComment {
  _id?: string;
  commenter: string;
  text: string;
  createdAt?: Date;
}

/**
 * Post interface extending Mongoose Document
 */
export interface IPost extends Document {
  title: string;
  author: string;
  category: 'tech' | 'finance' | 'lifestyle';
  body: string;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Request body types
 */
export interface ICreatePostRequest {
  title: string;
  author: string;
  category: 'tech' | 'finance' | 'lifestyle';
  body: string;
}

export interface IUpdatePostRequest {
  title?: string;
  author?: string;
  category?: 'tech' | 'finance' | 'lifestyle';
  body?: string;
}

export interface IAddCommentRequest {
  commenter: string;
  text: string;
}
