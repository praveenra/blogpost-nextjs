'use client';

import React from 'react';
import styles from './PostList.module.scss';
import { IPost } from '@/modules/posts/types';

interface PostListProps {
  posts: IPost[];
  selectedPostId?: string;
  onSelectPost: (post: IPost) => void;
  loading: boolean;
}

export function PostList({ posts, selectedPostId, onSelectPost, loading }: PostListProps) {
  if (loading && posts.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingText}>Loading posts...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyText}>No posts yet. Create your first post!</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Blog Posts</h2>
      <div className={styles.postsList}>
        {posts.map((post) => (
          <div
            key={post._id}
            className={`${styles.postItem} ${selectedPostId === post._id ? styles.selected : ''}`}
            onClick={() => onSelectPost(post)}
          >
            <div className={styles.postHeader}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <span className={`${styles.category} ${styles[`category-${post.category}`]}`}>
                {post.category}
              </span>
            </div>
            <p className={styles.postPreview}>
              {post.body.substring(0, 120)}...
            </p>
            <div className={styles.postMeta}>
              <span className={styles.author}>By {post.author}</span>
              <span className={styles.date}>
                {new Date(post.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
