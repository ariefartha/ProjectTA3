import React from 'react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import {
  Box,
  Heading,
  Text,
  Button,
  Icon,
  VStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import { FaFileImage } from 'react-icons/fa';

const Certificate = () => {
  const [user] = useRecoilState(userAtom);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleDownload = async () => {
    try {
      const response = await fetch(user.certificate, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Gagal mendownload file.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `Sertifikat Mengemudi Siswa-${user.username}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Hapus URL setelah download selesai
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      minH="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Box
        bg={bgColor}
        p={6}
        rounded="md"
        shadow="md"
        border="1px"
        borderColor={borderColor}
        maxW="lg"
        mx="auto"
        textAlign="center"
      >
        <VStack spacing={4} align="center">
          <Icon as={FaFileImage} boxSize={14} color="teal.400" />
          <Heading size="lg">Sertifikat</Heading>
          <Divider />
          {user.certificate ? (
            <>
              <Text fontSize="md" color="gray.600">
                Selamat {user.username}! Sertifikat mengemudi anda telah tersedia.
              </Text>
              <Button
                colorScheme="orange"
                size="lg"
                leftIcon={<FiDownload />}
                onClick={handleDownload}
              >
                Download Sertifikat
              </Button>
            </>
          ) : (
            <Text fontSize="lg" color="red.500">
              Anda belum memiliki sertifikat.
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default Certificate;
