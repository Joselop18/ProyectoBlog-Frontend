import { useState, useEffect } from 'react';
import { fetchComments, saveComment } from '../service/api';

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

      if (data && data.error) {
          setError('Hubo un error al cargar los comentarios.');
          setComments([]); 
      } else if (Array.isArray(data)) {
          setComments(data);
      } else {
          setError('Respuesta inesperada al cargar los comentarios.');
          console.error('Formato de datos inesperado de fetchComments:', data);
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

  const handleAddComment = async (post, comment, author) => {
    setLoading(true);
    setError(null);

    try {
      const commentData = { comment, author, post };
      const responseData = await saveComment(post, commentData);
      if (responseData && responseData.error) {
          setError('Hubo un error al agregar el comentario.');
      } else if (responseData && responseData.comment) {
        const newComment = responseData.comment;
        setComments((prevComments) => [...prevComments, newComment]);
        setError(null);
      } else {
        setError('Hubo un error al agregar el comentario o la respuesta del servidor fue inesperada.');
        console.error('Respuesta inesperada de la API al guardar comentario:', responseData);
      }

    } catch (error) {
      setError('Hubo un error al agregar el comentario.');
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
  };
};

export default useComments;