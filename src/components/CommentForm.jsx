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
  useToast 
} from '@chakra-ui/react';
import useComments from '../hooks/useCommentView';

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const { comments, loading, error, handleAddComment } = useComments(postId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment && author) {
      try {
        await handleAddComment(postId, comment, author);
        setComment('');
        setAuthor('');
        toast({
          title: 'Comentario agregado',
          description: 'Tu comentario ha sido agregado con éxito.',
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
        title: 'Campos incompletos',
        description: 'Por favor completa todos los campos.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const uniqueComments = Array.from(new Set(comments.map(comment => comment._id)))
    .map(id => comments.find(comment => comment._id === id));

  return (
    <div>
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
              <FormControl id="userName" isRequired>
                <FormLabel>Usuario</FormLabel>
                <Input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Tu nombre"
                />
              </FormControl>
              <FormControl id="content" isRequired mt={4}>
                <FormLabel>Comentario</FormLabel>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe tu comentario aquí"
                />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="teal" mr={3} type="submit" isLoading={loading}>
                  Enviar Comentario
                </Button>
                <Button variant="ghost" onClick={onClose}>Cerrar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  );
};

export default CommentForm;