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
    const response = await apiClient.get(`/comments/${postId}`);
    if (response.data && response.data.comments) {
        return response.data.comments;
    } else {
        console.error("Estructura de respuesta inesperada de fetchComments:", response.data);
        return [];
    }
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

export const updateComment = async (id, data) => {
  try {
    const response = await apiClient.put(`/comments/${id}`, data);
    return response.data;
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
