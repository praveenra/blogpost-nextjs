'use client';

import React, { useState, useEffect } from 'react';
import styles from './PostForm.module.scss';
import { IPost } from '@/modules/posts/types';

interface PostFormProps {
  selectedPost?: IPost;
  onSave: (post: Partial<IPost>) => Promise<void>;
  loading: boolean;
  error?: string;
  onSuccess?: () => void;
}

export function PostForm({ selectedPost, onSave, loading, error, onSuccess }: PostFormProps) {
  const [formData, setFormData] = useState<Partial<IPost>>({
    title: '',
    author: '',
    category: 'tech',
    body: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setFormData({
        title: selectedPost.title,
        author: selectedPost.author,
        category: selectedPost.category,
        body: selectedPost.body,
      });
      setValidationErrors({});
      setSuccessMessage('');
    } else {
      setFormData({
        title: '',
        author: '',
        category: 'tech',
        body: '',
      });
    }
  }, [selectedPost]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title || formData.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }
    if (!formData.author || formData.author.length < 3) {
      errors.author = 'Author must be at least 3 characters';
    }
    if (!formData.body || formData.body.length < 50) {
      errors.body = 'Body must be at least 50 characters';
    }
    if (!formData.category) {
      errors.category = 'Category is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
      setSuccessMessage(selectedPost ? 'Post updated successfully!' : 'Post created successfully!');
      if (!selectedPost) {
        setFormData({
          title: '',
          author: '',
          category: 'tech',
          body: '',
        });
      }
      setTimeout(() => {
        setSuccessMessage('');
        onSuccess?.();
      }, 2000);
    } catch (err) {
      // Error is handled by parent component
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className={`${styles.input} ${validationErrors.title ? styles.invalid : ''}`}
          placeholder="Enter post title"
          disabled={loading}
        />
        {validationErrors.title && (
          <span className={styles.error}>{validationErrors.title}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author" className={styles.label}>
          Author
        </label>
        <input
          id="author"
          type="text"
          name="author"
          value={formData.author || ''}
          onChange={handleChange}
          className={`${styles.input} ${validationErrors.author ? styles.invalid : ''}`}
          placeholder="Enter author name"
          disabled={loading}
        />
        {validationErrors.author && (
          <span className={styles.error}>{validationErrors.author}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category || 'tech'}
          onChange={handleChange}
          className={`${styles.select} ${validationErrors.category ? styles.invalid : ''}`}
          disabled={loading}
        >
          <option value="tech">Technology</option>
          <option value="finance">Finance</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        {validationErrors.category && (
          <span className={styles.error}>{validationErrors.category}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="body" className={styles.label}>
          Body
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body || ''}
          onChange={handleChange}
          className={`${styles.textarea} ${validationErrors.body ? styles.invalid : ''}`}
          placeholder="Enter post content (minimum 50 characters)"
          rows={8}
          disabled={loading}
        />
        <div className={styles.charCount}>
          {formData.body?.length || 0} / 50 characters minimum
        </div>
        {validationErrors.body && (
          <span className={styles.error}>{validationErrors.body}</span>
        )}
      </div>

      {error && <div className={styles.apiError}>{error}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Saving...' : selectedPost ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}

export default PostForm;
