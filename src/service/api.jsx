import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/blog/v1",
  timeout: 5000,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Content-Type": "application/json"
  }
});

export const getCourses = async () => {
  try {
    return await apiClient.get('/courses/');
  } catch (error) {
    return { error: true, e: error };
  }
};

export const getPost = async () => {
  try {
    return await apiClient.get('/posts/');
  } catch (error) {
    return { error: true, e: error };
  }
};

export const fetchComments = async (postId) => {
  try {
    const response = await apiClient.get(`/comments/post/${postId}`);
    return response.data.comments;
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    return { error: true, e: error };
  }
};

export const saveComment = async (postId, data) => {
  try {
    const response = await apiClient.post(`/comments/${postId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al guardar comentario:", error);
    return { error: true, e: error };
  }
};

export const getComments = async () => {
  try {
    const response = await apiClient.get(`/comments/`);
    return response.data.comments;
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    return { error: true, e: error };
  }
};

export const getCommentById = async (id) => {
  try {
    const response = await apiClient.get(`/comments/${id}`);
    return response.data.comment;
  } catch (error) {
    console.error("Error al obtener el comentario por ID:", error);
    return { error: true, e: error };
  }
};

export const fetchCommentsByPost = async (postId) => {
  try {
    const response = await apiClient.get(`/comments/post/${postId}`);
    return response.data.comments;
  } catch (error) {
    console.error("Error al obtener comentarios para el post:", error);
    return { error: true, e: error };
  }
};

export const updateComment = async (id, data) => {
  try {
    const response = await apiClient.put(`/comments/${id}`, data);
    return response.data.comment;
  } catch (error) {
    return { error: true, e: error };
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await apiClient.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    return { error: true, e: error };
  }
};