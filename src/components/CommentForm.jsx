import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';

const CommentForm = ({ postId, handleAddComment, handleUpdateComment, editingComment, setEditingComment }) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (editingComment) {
      setComment(editingComment.comment || '');
      setAuthor(editingComment.author === 'Anónimo' ? '' : editingComment.author || '');
      onOpen();
    }
  }, [editingComment, onOpen]);

  const resetForm = () => {
    setComment('');
    setAuthor('');
    setEditingComment(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      try {
        if (editingComment) {
          await handleUpdateComment(editingComment._id, {
            comment,
            author: author.trim() || 'Anónimo',
          });
          toast({
            title: 'Comentario actualizado',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          await handleAddComment(postId, comment, author.trim() || 'Anónimo');
          toast({
            title: 'Comentario agregado',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
        resetForm();
        onClose();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Hubo un problema al guardar el comentario.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Comentario vacío',
        description: 'Escribe algo antes de enviar.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {!editingComment && (
        <Button onClick={onOpen} colorScheme="teal">
          Agregar Comentario
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={() => { onClose(); resetForm(); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingComment ? 'Editar Comentario' : 'Agregar Comentario'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Tu nombre (opcional)</FormLabel>
                <Input
                  placeholder="Escribe Tu Nombre aquí (Opcional)"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Comentario</FormLabel>
                <Textarea
                  placeholder="Escribe tu comentario aquí"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="teal" type="submit" mr={3}>
                  {editingComment ? 'Actualizar' : 'Enviar Comentario'}
                </Button>
                <Button onClick={() => { onClose(); resetForm(); }}>Cerrar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentForm;
