import { useState, useCallback } from 'react';
import axios from 'axios';
import { IPost } from '@/modules/posts/types';
import { IComment } from '@/modules/comments/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface UsePostsState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
}

export function usePosts() {
  const [state, setState] = useState<UsePostsState>({
    posts: [],
    loading: false,
    error: null,
  });

  const fetchPosts = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axios.get(`${API_URL}/api/posts`);
      setState((prev) => ({
        ...prev,
        posts: response.data.data,
        loading: false,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to fetch posts',
        loading: false,
      }));
    }
  }, []);

  const createPost = useCallback(async (post: Partial<IPost>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axios.post(`${API_URL}/api/posts`, post);
      setState((prev) => ({
        ...prev,
        posts: [response.data.data, ...prev.posts],
        loading: false,
      }));
      return response.data.data;
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to create post',
        loading: false,
      }));
      throw error;
    }
  }, []);

  const updatePost = useCallback(async (id: string, post: Partial<IPost>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axios.put(`${API_URL}/api/posts/${id}`, post);
      setState((prev) => ({
        ...prev,
        posts: prev.posts.map((p) => (p._id === id ? response.data.data : p)),
        loading: false,
      }));
      return response.data.data;
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to update post',
        loading: false,
      }));
      throw error;
    }
  }, []);

  const deletePost = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await axios.delete(`${API_URL}/api/posts/${id}`);
      setState((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to delete post',
        loading: false,
      }));
      throw error;
    }
  }, []);

  const addComment = useCallback(async (postId: string, comment: IComment) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axios.post(`${API_URL}/api/posts/${postId}/comments`, comment);
      setState((prev) => ({
        ...prev,
        posts: prev.posts.map((p) => (p._id === postId ? response.data.data : p)),
        loading: false,
      }));
      return response.data.data;
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to add comment',
        loading: false,
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    addComment,
  };
}
