import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Box } from '@chakra-ui/react';
import CommentsList from '../components/CommentList';
import Navbar from '../components/Navbar';

const CommentsPage = () => {
  const { postId } = useParams();

  return (
    <>
      <Navbar />
      <Container maxW="container.lg" py={10}>
        <Box>
          <Heading size="md" mb={4}>
            Comentarios
          </Heading>
          <CommentsList postId={postId} />
        </Box>
      </Container>
    </>
  );
};

export default CommentsPage;