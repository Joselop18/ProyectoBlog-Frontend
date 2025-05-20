// hooks/useComments.js
import { useState, useEffect } from 'react';
import { saveComment } from '../service/api';

const useComments = (postId = null) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await saveComment();
      const filteredComments = postId
        ? data.filter((comment) => comment.postId === postId)
        : data;
      setComments(filteredComments);
    } catch (error) {
      setError('Hubo un error al cargar los comentarios.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (postId, content, userName) => {
    setLoading(true);
    setError(null);

    try {
      const commentData = { content, userName, postId };
      const newComment = await saveComment(postId, commentData);
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      setError('Hubo un error al agregar el comentario.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return {
    comments,
    loading,
    error,
    handleAddComment,
  };
};

export default useComments;