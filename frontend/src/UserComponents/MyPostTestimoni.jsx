import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, HStack, Avatar, Button, Spinner, Flex } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom.js';
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from 'react-router-dom';

const MyPostTestimoni = () => {
  const [testimoni, setTestimoni] = useState(null);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [user] = useRecoilState(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyPost = async () => {
      try {
        const res = await fetch(`/api/testimoni/getmypost/${user._id}`, {
          method: 'GET',
        });
        const data = await res.json();
        if (res.ok) {
          setTestimoni(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user._id) {
      getMyPost();
    }
  }, [user._id]);

  const formatDateToIndonesian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Apakah anda ingin menghapus testimoni ini?")) return;
      const res = await fetch(`/api/testimoni/deletetestimoni/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Gagal!", data.error, "error");
        return;
      } else {
        showToast("Sukses😊", data.message, "success");
      }
      navigate("/user");
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW={{ base: "90%", md: "800px" }} mx="auto" mt={{ base: "5", md: "10" }} p={5} boxShadow="lg" borderRadius="md" bg="white">
      <Heading
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize={{ base: "24px", md: "30px" }}
        mb={6}
        textAlign="center"
      >
        Postingan Testimoni
      </Heading>
      {testimoni ? (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" position="relative">
          <VStack align="start">
            <HStack spacing={4} alignItems="center" flexWrap="wrap">
              <Avatar name={testimoni.username} size={{ base: "sm", md: "md" }} />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize={{ base: "16px", md: "18px" }}>{testimoni.username}</Text>
                <Text color="gray.500" fontSize={{ base: "12px", md: "14px" }}>
                  {formatDateToIndonesian(testimoni.createdAt)}
                </Text>
              </VStack>
            </HStack>
            <Text wordBreak="break-word" fontSize={{ base: "14px", md: "16px" }}>
              {testimoni.comments}
            </Text>
            <Button
            colorScheme="red"
            size={"sm"}
            onClick={() => handleDelete(testimoni._id)}
            alignSelf="flex-end"
            mt={2}
            bottom="10px"
            right="10px"
          >
            Hapus
          </Button>
          </VStack>
        </Box>
      ) : (
        <Text fontSize={{ base: "14px", md: "16px" }} textAlign="center">Postingan testimoni anda masih kosong.</Text>
      )}
    </Box>
  );
};

export default MyPostTestimoni;
