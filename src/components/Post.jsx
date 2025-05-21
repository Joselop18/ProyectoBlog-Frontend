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
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import CommentForm from './CommentForm';
import useComments from '../hooks/useCommentView';

const Post = ({ post }) => {
  const [openPostId, setOpenPostId] = useState(null);
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  const isOpen = openPostId === post._id;
  const toggleOpen = () => {
    setOpenPostId(isOpen ? null : post._id);
  };

  const { comments, loading, error, handleAddComment } = useComments(post._id);

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
          <CommentForm postId={post._id} handleAddComment={handleAddComment} />

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
                    <Divider my={2} />
                  </ListItem>
                ))
              ) : (
                <Text color={secondaryTextColor}>No hay comentarios aún.</Text>
              )}
            </List>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Post;
