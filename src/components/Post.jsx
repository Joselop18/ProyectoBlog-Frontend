import {
  Box,
  Text,
  Button,
  Collapse,
  useColorModeValue,
  Divider,
  List,
  ListItem,
  ListIcon,
  HStack,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { CheckCircleIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import CommentForm from './CommentForm';
import useComments from '../hooks/useCommentView';

const Post = ({ post }) => {
  const [openPostId, setOpenPostId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const cancelRef = useRef();
  const toast = useToast();

  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  const isOpen = openPostId === post._id;
  const toggleOpen = () => {
    setOpenPostId(isOpen ? null : post._id);
    setEditingComment(null);
  };

  const {
    comments,
    loading,
    error,
    handleAddComment,
    handleDeleteComment,
    handleUpdateComment,
  } = useComments(post._id);

  const confirmDelete = async () => {
    if (commentToDelete) {
      await handleDeleteComment(commentToDelete._id);
      toast({
        title: 'Comentario eliminado',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      setCommentToDelete(null);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="md"
      mb={4}
    >
      <Text fontSize="2xl" fontWeight="bold" color={textColor}>
        {post.title}
      </Text>
      <Text fontSize="md" fontWeight="bold" color={textColor}>
        Curso: <Text as="span" fontWeight="normal">{post.course?.name}</Text>
      </Text>
      <Text mt={2} color={secondaryTextColor}>
        {post.course?.description}
      </Text>

      <Button onClick={toggleOpen} mt={4}>
        {isOpen ? 'Ocultar comentarios' : 'Ver comentarios'}
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <Box mt={4}>
          <CommentForm
            postId={post._id}
            handleAddComment={handleAddComment}
            handleUpdateComment={handleUpdateComment}
            editingComment={editingComment}
            setEditingComment={setEditingComment}
          />

          {loading ? (
            <Text mt={2}>Cargando comentarios...</Text>
          ) : error ? (
            <Text mt={2} color="red.500">Error al cargar comentarios</Text>
          ) : (
            <List spacing={3} mt={4}>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <ListItem key={comment._id}>
                    <ListIcon as={CheckCircleIcon} color="teal.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {comment.author}:
                    </Text>
                    <Text color={secondaryTextColor}>{comment.comment}</Text>
                    <HStack spacing={2} mt={2}>
                      <Button
                        size="sm"
                        leftIcon={<EditIcon />}
                        onClick={() => setEditingComment(comment)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        leftIcon={<DeleteIcon />}
                        onClick={() => setCommentToDelete(comment)}
                      >
                        Eliminar
                      </Button>
                    </HStack>
                    <Divider my={3} />
                  </ListItem>
                ))
              ) : (
                <Text color={secondaryTextColor}>No hay comentarios aún.</Text>
              )}
            </List>
          )}
        </Box>
      </Collapse>

      {/* Modal de Confirmación de Eliminación */}
      <AlertDialog
        isOpen={!!commentToDelete}
        leastDestructiveRef={cancelRef}
        onClose={() => setCommentToDelete(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Comentario
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro que deseas eliminar este comentario?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setCommentToDelete(null)}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Post;