/**
 * Comment Type Definitions
 */

export interface IComment {
  _id?: string;
  commenter: string;
  text: string;
  createdAt?: Date;
}

export interface ICreateCommentRequest {
  commenter: string;
  text: string;
}
