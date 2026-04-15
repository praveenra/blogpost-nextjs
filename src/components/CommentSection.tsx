'use client';

import React, { useState } from 'react';
import styles from './CommentSection.module.scss';
import { IPost } from '@/modules/posts/types';
import { IComment } from '@/modules/comments/types';

interface CommentSectionProps {
  post: IPost | undefined;
  onAddComment: (postId: string, comment: IComment) => Promise<void>;
  loading: boolean;
  error?: string;
}

export function CommentSection({
  post,
  onAddComment,
  loading,
  error,
}: CommentSectionProps) {
  const [commentForm, setCommentForm] = useState({ commenter: '', text: '' });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateComment = (): boolean => {
    const errors: Record<string, string> = {};

    if (!commentForm.commenter || commentForm.commenter.length < 3) {
      errors.commenter = 'Name must be at least 3 characters';
    }
    if (!commentForm.text || commentForm.text.length < 10) {
      errors.text = 'Comment must be at least 10 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !validateComment()) return;

    try {
      await onAddComment(post._id!, {
        commenter: commentForm.commenter,
        text: commentForm.text,
        createdAt: new Date(),
      });
      setCommentForm({ commenter: '', text: '' });
      setSuccessMessage('Comment added successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      // Error handled by parent
    }
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (!post) {
    return (
      <div className={styles.empty}>
        <p>Select a post to view and add comments</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comments ({post.comments?.length || 0})</h3>

      {/* Comments List */}
      <div className={styles.commentsList}>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={comment._id || index} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span className={styles.commenter}>{comment.commenter}</span>
                <span className={styles.date}>
                  {new Date(comment.createdAt || new Date()).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          ))
        ) : (
          <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Add Comment Form */}
      <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
        <h4 className={styles.formTitle}>Add Comment</h4>

        <div className={styles.formGroup}>
          <label htmlFor="commenter" className={styles.label}>
            Your Name
          </label>
          <input
            id="commenter"
            type="text"
            name="commenter"
            value={commentForm.commenter}
            onChange={handleCommentChange}
            className={`${styles.input} ${validationErrors.commenter ? styles.invalid : ''}`}
            placeholder="Enter your name"
            disabled={loading}
          />
          {validationErrors.commenter && (
            <span className={styles.error}>{validationErrors.commenter}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="text" className={styles.label}>
            Comment
          </label>
          <textarea
            id="text"
            name="text"
            value={commentForm.text}
            onChange={handleCommentChange}
            className={`${styles.textarea} ${validationErrors.text ? styles.invalid : ''}`}
            placeholder="Enter your comment (minimum 10 characters)"
            rows={3}
            disabled={loading}
          />
          <div className={styles.charCount}>
            {commentForm.text.length} / 10 characters minimum
          </div>
          {validationErrors.text && (
            <span className={styles.error}>{validationErrors.text}</span>
          )}
        </div>

        {error && <div className={styles.apiError}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
}

export default CommentSection;
