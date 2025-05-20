import React, { useState } from 'react';
import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import usePosts from '../hooks/usePostsView';
import Post from '../components/Post';

const HomePage = () => {
    const { posts, loading, error } = usePosts();
    const [openPostId, setOpenPostId] = useState(null);
  
    const toggleDetails = (postId) => {
      setOpenPostId((prevPostId) => (prevPostId === postId ? null : postId));
    };
  
    const sortPosts = (posts) => {
      if (Array.isArray(posts)) {
        return posts.sort((a, b) => a.title.localeCompare(b.title));
      }
      return [];
    };
  
    const sortedPosts = Array.isArray(posts) ? sortPosts(posts) : [];
  
    const textColor = useColorModeValue('gray.600', 'gray.200');
  
    if (loading) {
      return (
        <>
          <Navbar />
          <Container maxW="container.xl" py={10} textAlign="center">
            <Spinner size="xl" color="teal.300" />
            <Text mt={2} color={textColor}>Cargando...</Text>
          </Container>
        </>
      );
    }
  
    if (error) {
      return (
        <>
          <Navbar />
          <Container maxW="container.xl" py={10}>
            <Alert status="error" borderRadius="md" variant="left-accent" colorScheme="red">
              <AlertIcon />
              {error}
            </Alert>
          </Container>
        </>
      );
    }
  
    return (
      <>
        <Navbar />
        <Container maxW="container.xl" py={10}>
          <Heading mb={6} fontSize="3xl" color={textColor} fontWeight="bold" textAlign="center">
            No hay publicaciones disponibles
          </Heading>
          {sortedPosts.length === 0 ? (
            <Text color={textColor} fontSize="lg" textAlign="center"></Text>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={10}>
              {sortedPosts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  openPostId={openPostId}
                  toggleDetails={toggleDetails}
                  openModal={() => openModal(post._id)} 
                />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </>
    );
  };
  
export default HomePage;