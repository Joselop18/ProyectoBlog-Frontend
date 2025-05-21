import React, { useState } from 'react';
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
  useToast
} from '@chakra-ui/react';
import useComments from '../hooks/useCommentView';

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const { loading, handleAddComment } = useComments(postId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      try {
        await handleAddComment(postId, comment, author.trim() || 'Anónimo');
        setComment('');
        setAuthor('');
        toast({
          title: 'Comentario agregado',
          description: 'Tu comentario ha sido publicado.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Hubo un problema al agregar tu comentario.',
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
      <Button onClick={onOpen} colorScheme="teal">
        Agregar Comentario
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Comentario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Tu nombre (opcional)</FormLabel>
                <Input
                  placeholder="Escribe Tu Nombre aqui (Opcional)"
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
                <Button colorScheme="teal" type="submit" mr={3} isLoading={loading}>
                  Enviar Comentario
                </Button>
                <Button onClick={onClose}>Cerrar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentForm;
