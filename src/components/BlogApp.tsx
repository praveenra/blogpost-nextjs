'use client';

import React, { useEffect } from 'react';
import styles from './BlogApp.module.scss';
import { usePosts } from '@/hooks/usePosts';
import { IPost } from '@/modules/posts/types';
import PostList from './PostList';
import PostForm from './PostForm';
import CommentSection from './CommentSection';

export function BlogApp() {
  const {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    addComment,
  } = usePosts();

  const [selectedPost, setSelectedPost] = React.useState<IPost | undefined>();
  const [formError, setFormError] = React.useState<string>();

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreateOrUpdatePost = async (post: Partial<IPost>) => {
    try {
      setFormError(undefined);
      if (selectedPost) {
        await updatePost(selectedPost._id!, post);
        setSelectedPost(undefined);
      } else {
        await createPost(post);
      }
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        setSelectedPost(undefined);
      } catch (err: any) {
        setFormError(err.response?.data?.error || 'Failed to delete post');
      }
    }
  };

  const handleAddComment = async (postId: string, comment: any) => {
    try {
      setFormError(undefined);
      await addComment(postId, comment);
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to add comment');
    }
  };

  const handleSelectPost = (post: IPost) => {
    setSelectedPost(post);
    setFormError(undefined);
  };

  return (
    <div className={styles.container}>
      {/* Top navigation */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Blog Platform</h1>
          <p className={styles.headerSubtitle}>A modern blog built with Next.js and React</p>
        </div>
      </header>

      {/* Main content area */}
      <div className={styles.mainContent}>
        {/* Left panel: Posts list */}
        <div className={styles.leftPanel}>
          <PostList
            posts={posts}
            selectedPostId={selectedPost?._id}
            onSelectPost={handleSelectPost}
            loading={loading}
          />
        </div>

        {/* Right panel: Editor and comments */}
        <div className={styles.rightPanel}>
          <div className={styles.editorSection}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              {selectedPost && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeletePost(selectedPost._id!)}
                  disabled={loading}
                >
                  Delete
                </button>
              )}
            </div>
            <PostForm
              selectedPost={selectedPost}
              onSave={handleCreateOrUpdatePost}
              loading={loading}
              error={formError}
              onSuccess={() => fetchPosts()}
            />
          </div>

          {/* Comments section */}
          <div className={styles.commentSection}>
            <CommentSection
              post={selectedPost}
              onAddComment={handleAddComment}
              loading={loading}
              error={formError}
            />
          </div>
        </div>
      </div>

      {/* Global error banner */}
      {error && !formError && (
        <div className={styles.globalError}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default BlogApp;
