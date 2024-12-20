import React from 'react';
import {
  Box, Image, Text, Button, Grid, Flex, useBreakpointValue, Spinner, Input, Modal, ModalBody,
  ModalHeader, ModalCloseButton, ModalContent, ModalFooter, FormControl, FormLabel, useDisclosure, ModalOverlay, Select
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { MdAdd } from 'react-icons/md';

const PacketCardList = () => {
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [packets, setPackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
  const [input, setInput] = useState({
    packetName: "",
    price: "",
    text1: "",
    text2: "",
    text3: "",
    category: "",
  });

  useEffect(() => {
    const getPackets = async () => {
      try {
        const res = await fetch("/api/booking/getpacket");
        const data = await res.json();
        if (res.ok) {
          setPackets(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getPackets();
  }, []);

  const deletePacket = async (id) => {
    try {
      if (!window.confirm("Apakah anda ingin menghapus data ini?")) return;
      setLoading(true);
      const res = await fetch(`/api/booking/packet/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Sukses 😊", "Paket berhasil dihapus", "success");
        setPackets((prevPackets) => prevPackets.filter(packet => packet._id !== id));
      } else {
        showToast("Gagal", data.message || "Terjadi kesalahan", "error");
      }
    } catch (error) {
      showToast("Gagal", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const createPacket = async () => {
    try {
      const res = await fetch("/api/booking/packet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if(!res.ok) {
        showToast("Gagal", data.message, "error");
        return;
      }
      showToast("Sukses😊", data.message, "success");
      setInput("");
      onClose();
    } catch (error) {
      showToast("Gagal", error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      {/* Add button section */}
      <Flex justifyContent="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">Daftar Paket</Text>
        <Button onClick={onOpen} leftIcon={<MdAdd />} colorScheme="orange" >Paket</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>Tambah Paket Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mt={2}>
              <FormLabel>Nama Paket</FormLabel>
              <Input
                type="text"
                value={input.packetName}
                onChange={(e) => setInput({ ...input, packetName: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Harga Paket</FormLabel>
              <Input
                type="number"
                value={input.price}
                onChange={(e) => setInput({ ...input, price: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Kategory Mobil</FormLabel>
              <Select
                placeholder="Pilih Tipe Mobil"
                type="text"
                value={input.category}
                onChange={(e) => setInput({ ...input, category: e.target.value })}>
                <option value="matic">Matic</option>
                <option value="manual">Manual</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Teks 1</FormLabel>
              <Input
                type="text"
                value={input.text1}
                onChange={(e) => setInput({ ...input, text1: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Teks 2</FormLabel>
              <Input
                type="text"
                value={input.text2}
                onChange={(e) => setInput({ ...input, text2: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Teks 3</FormLabel>
              <Input
                type="text"
                value={input.text3}
                onChange={(e) => setInput({ ...input, text3: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onClose}>Batal</Button>
            <Button colorScheme='twitter' isLoading={loading} onClick={createPacket} >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Grid layout */}
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
        {packets.map((packet) => (
          <Box
            key={packet._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="lg"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.05)", boxShadow: 'xl' }}
          >
            <Image
              src='/pakets.png'
              alt={packet.packetName}
              mb={4}
              borderRadius="md"
            />
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {packet.packetName}
                </Text>
                <Text fontSize="md" color="gray.500">
                  Harga: {packet.price}
                </Text>
                <Text fontSize="md" color="gray.500">
                  Tipe: {packet.category}
                </Text>
              </Box>
              <Button isLoading={loading} size="sm" colorScheme="red" onClick={() => deletePacket(packet._id)}>
                Hapus
              </Button>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default PacketCardList;
