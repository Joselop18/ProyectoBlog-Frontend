import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Container,
  Fade,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import CommentForm from './CommentForm';

const Post = ({ post }) => {
  const [openPostId, setOpenPostId] = useState(null);

  const toggleDetails = (id) => {
    setOpenPostId(openPostId === id ? null : id);
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const buttonBg = useColorModeValue('teal.500', 'teal.300');
  const buttonHoverBg = useColorModeValue('teal.600', 'teal.400');
  const collapseBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Container maxW="container.lg" p={6}>
      <VStack
        p={10}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg={cardBg}
        borderColor={borderColor}
        spacing={8}
        align="start"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{ transform: 'scale(1.05)', boxShadow: '2xl' }}
        width="full"
      >
        <Heading size="xl" color={textColor} fontWeight="bold" textAlign="center">
          {post.title}
        </Heading>
        <Text fontSize="md" color={secondaryTextColor} textAlign="center" mt={2}>
          Curso: {post.courses}
        </Text>
        <Text color={textColor} noOfLines={6} mt={4} fontSize="lg">
          {post.description}
        </Text>

        <Button
          size="lg"
          colorScheme="teal"
          variant="outline"
          mt={6}
          onClick={() => toggleDetails(post._id)}
          _hover={{ bg: buttonHoverBg }}
          borderColor={buttonBg}
          width="full"
        >
          {openPostId === post._id ? 'Ocultar comentarios' : 'Ver comentarios'}
        </Button>

        <Collapse in={openPostId === post._id} animateOpacity>
          <Fade in={openPostId === post._id}>
            <Box
              mt={8}
              p={6}
              borderLeft="6px solid"
              borderColor={buttonBg}
              bg={collapseBg}
              borderRadius="md"
              width="full"
              boxShadow="xl"
            >
              <CommentForm postId={post._id} />

              <Box mt={6}>
                <Heading size="md" color={textColor}>
                  Comentarios
                </Heading>
                <List spacing={3} mt={4}>
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
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
              </Box>
            </Box>
          </Fade>
        </Collapse>
      </VStack>
    </Container>
  );
};

export default Post;