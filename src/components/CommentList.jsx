import React from 'react';
import { Box, Text, VStack, Heading, useColorModeValue, Avatar, HStack, Divider } from '@chakra-ui/react';
import useComments from '../hooks/useCommentView';

const CommentsList = ({ postId, postTitle }) => {
  const { comments, loading, error } = useComments(postId);

  const boxBackground = useColorModeValue('white', 'gray.800');
  const boxBorderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const shadowColor = useColorModeValue('lg', 'xl');
  const timestampColor = useColorModeValue('gray.500', 'gray.400');

  const sortedComments = Array.isArray(comments)
  ? [...comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  : [];

  return (
    <Box p={4} bg={useColorModeValue('gray.50', 'gray.900')} borderRadius="md" shadow="sm">
      {loading && <Text> Cargando comentarios...</Text>}
      {error && <Text color="red.500">{error}</Text>}

      <VStack spacing={6} align="stretch">
        <Heading size="lg" color={headingColor} mb={4}>
          {postTitle}
        </Heading>
        <Heading size="lg" color={headingColor}>
          Últimos comentarios
        </Heading>
        {sortedComments.length > 0 ? (
          sortedComments.map((comments) => (
            <Box
              key={comments._id}
              borderWidth={1}
              borderColor={boxBorderColor}
              borderRadius="lg"
              p={6}
              bg={boxBackground}
              shadow={shadowColor}
              _hover={{
                shadow: '2xl',
                transform: 'scale(1.02)',
                bg: useColorModeValue('gray.100', 'gray.700'),
              }}
              transition="all 0.3s ease"
            >
              <HStack spacing={4} align="center">
                <Heading size="sm" color={headingColor} fontWeight="bold">
                  {comments.author}
                </Heading>
              </HStack>
              <Text fontSize="md" mt={4} color={textColor}>
                {comments.comment}
              </Text>
              <Text fontSize="sm" color={timestampColor} mt={2}>
                {new Date(comments.createdAt).toLocaleString()}
              </Text>
            </Box>
          ))
        ) : (
          <Text color={textColor}>No hay comentarios disponibles.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default CommentsList;