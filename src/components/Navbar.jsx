import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const bgColor = useColorModeValue('#ffffff', '#bf9f88');
  const textColor = useColorModeValue('#bf9f88', '#ffff');
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const handleNavigateToComments = () => {
    navigate('/comments');
  };

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <Box
      bg={bgColor}
      px={6}
      py={4}
      color={textColor}
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          _hover={{ color: '#fce4be' }}
          transition="color 0.3s"
          onClick={handleNavigateToHome}
          cursor="pointer"
        >
          Proyecto Blog
        </Text>
        <HStack spacing={6} ml={10}>
          <Link
            fontWeight="medium"
            fontSize="lg"
            _hover={{
              color: '#fce4be',
              transform: 'scale(1.05)',
            }}
            transition="all 0.3s ease-in-out"
            onClick={handleNavigateToHome}
          >
            Publicaciones
          </Link>
          <Link
            href=""
            fontWeight="medium"
            fontSize="lg"
            _hover={{
              color: '#fce4be',
              transform: 'scale(1.05)',
            }}
            transition="all 0.3s ease-in-out"
            onClick={handleNavigateToComments}
          >
            Comentarios
          </Link>
        </HStack>
        <Spacer />
        <HStack spacing={4}>
          <Tooltip label={colorMode === 'light' ? 'Modo oscuro' : 'Modo claro'} aria-label="Tema">
            <IconButton
              aria-label="Cambiar tema"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              color="current"
              _hover={{ bg: '#bf9f88', transform: 'scale(1.1)' }}
              transition="all 0.3s ease"
            />
          </Tooltip>
        </HStack>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <img src={modalImage} alt="Perfil" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;