import { useState, useEffect } from 'react';
import {
  fetchComments,
  saveComment,
  deleteComment,
  updateComment
} from '../service/api';

const useComments = (post = null) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadComments = async () => {
    if (!post) {
      setComments([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchComments(post);

      if (data?.error) {
        setError('Hubo un error al cargar los comentarios.');
        setComments([]);
      } else if (Array.isArray(data)) {
        setComments(data);
      } else {
        setError('Respuesta inesperada al cargar los comentarios.');
        console.error('Formato inesperado de fetchComments:', data);
        setComments([]);
      }
    } catch (error) {
      setError('Hubo un error al cargar los comentarios.');
      console.error(error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (postId, comment, author) => {
    setLoading(true);
    setError(null);
    try {
      const commentData = { comment, author, postId: post };
      const responseData = await saveComment(postId, commentData);
      if (responseData?.error) {
        setError('Hubo un error al agregar el comentario.');
      } else if (responseData?.comment) {
        setComments((prev) => [...prev, responseData.comment]);
      } else {
        setError('Error inesperado al guardar el comentario.');
      }
    } catch (error) {
      setError('Hubo un error al agregar el comentario.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      setError('Hubo un error al eliminar el comentario.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComment = async (commentId, updatedData) => {
    setLoading(true);
    try {
      const updated = await updateComment(commentId, updatedData);
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? updated : c))
      );
    } catch (error) {
      setError('Hubo un error al actualizar el comentario.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [post]);

  return {
    comments,
    loading,
    error,
    handleAddComment,
    handleDeleteComment,
    handleUpdateComment,
  };
};

export default useComments;
