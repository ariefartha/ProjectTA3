import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  Button,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const savedPaymentData = localStorage.getItem("pembayaran");
    if (savedPaymentData) {
      setPaymentData(JSON.parse(savedPaymentData));
    }
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  return (
    <>
    <Center py={6}>
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          p={2}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          <Text
            fontSize={'md'}
            fontWeight={"bold"}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}>
            Pembayaran Sukses
          </Text>
          <Center>
            <Image boxSize='80px' src={"/verify.png"} alt='verify img' />
          </Center>
        </Stack>
        {paymentData ? (
        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={5} py={5}>
          <List spacing={3}>
            <ListItem>
              <Text fontWeight={"bold"} fontSize={"md"} color="green.400">Id pembayaran:</Text>
              <Text>{paymentData.order_id}</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight={"bold"} fontSize={"md"} color="green.400">Status Pembayaran:</Text>
              <Text>{paymentData.transaction_status === 'settlement' ? 'Telah Berhasil' : paymentData.transaction_status}</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight={"bold"} fontSize={"md"} color="green.400">Total Pembayaran:</Text>
              <Text>{formatRupiah(paymentData.gross_amount)}</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight={"bold"} fontSize={"md"} color="green.400">Tipe Pembayaran:</Text>
              <Text>{paymentData.payment_type === 'bank_transfer' ? 'Transfer Bank VA' : paymentData.payment_type}</Text>
            </ListItem>
          </List>
          <Link to={"/"}>
          <Button
            mt={5}
            w={'full'}
            bg={'orange'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}>
            Kembali ke dashboard
          </Button>
          </Link>
        </Box>
        ) : (
          <Text>data pembayaran tidak tersedia</Text>
          )}
      </Box>
    </Center>
    </>
  );
};

export default SuccessPage;
