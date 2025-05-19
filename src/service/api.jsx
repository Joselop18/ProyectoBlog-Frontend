import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/blog/v1",
    timeout: 5000,
    Headers: { "Cache-Control": "no-cache, no-store, must-revalidate" }
});

export const getCourses = async () => {
    try {
        return await apiClient.get('/courses/');
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
};

export const getPost = async () => {
    try {
        return await apiClient.get('/posts/');
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
};

export const saveComment = async () => {
    try {
        return await apiClient.get('/comments/', data);
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
};

export const updateComment = async () => {
    try {
        return await apiClient.get(`/comments/${id}`, data);
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
};

export const deleteComment = async () => {
    try {
        return await apiClient.get(`/comments/${id}`);
    } catch (error) {
        return {
            error: true,
            e: error
        }
    }
};

