import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  Box, Spinner, Text, Heading, Icon, VStack, HStack, Divider, useColorModeValue, Button
} from "@chakra-ui/react";
import { FaUser, FaBox, FaCloudsmith, FaCalendarAlt, FaCcVisa } from "react-icons/fa";
import { FaRupiahSign } from "react-icons/fa6";
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast";

const PurchaseDetails = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await fetch("https://project-backend-six.vercel.app/api/payment/mypaymentdetail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setDetails(data);
        } else {
          setDetails([]); 
        }
      } catch (error) {
        showToast("Gagal!", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      getOrder();
    }
  }, [user._id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (details.length === 0) { 
    return (
      <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Tidak ada data
      </Text>
      <Text color={'gray.500'} mb={6}>
        Anda belum melakukan Transaksi pembayaran apapun.
      </Text>
      <Link to={"/user"}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid">
          Kembali
        </Button>
      </Link>
    </Box>
    );
  }

  return (
    <Box minH="100vh" py={10}>
      <Heading mb={6} as="h2" size="xl" textAlign="center" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>
        Detail Pembelian
      </Heading>
      {details.map((detail) => (
        <Box
          key={detail._id}
          maxW="500px"
          bg={cardBg}
          p={8}
          rounded="xl"
          shadow="2xl"
          mb={8}
          mx="auto"
        >
          <VStack spacing={5} align="start">
            <HStack spacing={4}>
              <Icon as={FaUser} boxSize={7} color="teal.400" />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>Nama:</Text>
              <Text fontSize="lg" color={textColor}>{detail.username}</Text>
            </HStack>
            <Divider borderColor="teal.200" />
            <HStack spacing={4}>
              <Icon as={FaRupiahSign} boxSize={7} color="green.400" />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>Harga:</Text>
              <Text fontSize="lg" color={textColor}>{formatRupiah(detail.price)}</Text>
            </HStack>
            <Divider borderColor="green.200" />
            <HStack spacing={4}>
              <Icon as={FaBox} boxSize={7} color="blue.400" />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>Paket yang di beli:</Text>
              <Text fontSize="lg" color={textColor}>{detail.packetName}</Text>
            </HStack>
            <Divider borderColor="blue.200" />
            <HStack spacing={4}>
              <Icon as={FaCcVisa} boxSize={7} color="blue.400" />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>Tipe Pembayaran:</Text>
              <Text fontSize="lg" color={textColor}>{detail.typePayment}</Text>
            </HStack>
            <Divider borderColor="red.200" />
            <HStack spacing={4}>
              <Icon as={FaCloudsmith} boxSize={7} color="blue.400" />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>Status Pembayaran:</Text>
              <Text fontSize="lg" color={textColor}>{detail.payment_status}</Text>
            </HStack>
            <Divider borderColor="red.200" />
            <HStack spacing={4}>
              <Icon as={FaCalendarAlt} boxSize={7} color="purple.400" />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>Tanggal Pembelian:</Text>
              <Text fontSize="lg" color={textColor}>{new Date(detail.createdAt).toLocaleDateString()}</Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default PurchaseDetails;
