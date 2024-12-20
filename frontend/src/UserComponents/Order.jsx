import {
  Td, Heading, Box, Flex, Button, TableContainer,
  Table, Image, Thead, Tr, Th, Tbody, Divider,  Spinner, Text, 
  Modal, ModalOverlay, ModalBody, ModalHeader, ModalContent, ModalFooter, useDisclosure, ModalCloseButton, FormControl, FormLabel, Input
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import uploadFile from "../hooks/uploadFile.js";
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const { handleUpload, uploadImage } = uploadFile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState("");
  const [midtransScriptLoaded, setMidtransScriptLoaded] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await fetch("/api/booking/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        });
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        showToast("Gagal!", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [user._id]);

  const deleteMyOrder = async () => {
    setLoading(true);
    try {
      if (!window.confirm("Apakah anda yakin ingin menghapus pemesanan ini?")) return;
      const res = await fetch("/api/booking/deleteorder", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await res.json();

      if (data.error) {
        showToast("Gagal!", data.error, "error");
        return;
      }
      showToast("Sukses😊", data.message, "success");
      navigate("/user/packet");
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  }

  const handleManualPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/payment/manualpayment", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: order._id,
          manualPaymentImg: uploadImage,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        showToast("Sukses😊", result.message, "success");
        setOrder(null);
        onClose();
      } else {
        showToast("Gagal!", result.error, "error");
      }
    } catch (error) {
      showToast("Gagal!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };


  const handleMidtrans = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/payment/midtranspayment", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: order._id }),
      });
  
      const result = await response.json();
      if (response.ok) {
        if (midtransScriptLoaded) {
          window.snap.pay(result.token, {
            onSuccess: (result) => {
              // Simpan informasi pembayaran di localStorage
              localStorage.setItem("pembayaran", JSON.stringify(result));
              showToast("Sukses😊", "Pembayaran berhasil.", "success");
              window.location.href = "https://sukaprivatemengemudi.vercel.app/success";
              setOrder(null);
              onClose();
            },
            onPending: (result) => {
              localStorage.setItem("pembayaran", JSON.stringify(result));
              showToast("Info", "Pembayaran tertunda.", "info");
            },
            onError: (error) => {
              console.error(error);
              showToast("Gagal!", "Terjadi kesalahan pada proses pembayaran.", "error");
            },
            onClose: () => {
              showToast("Info", "Anda menutup popup pembayaran.", "info");
            }
          });
        } else {
          showToast("Gagal!", "Script Midtrans belum dimuat.", "error");
        }
      } else {
        showToast("Gagal!", result.error || "Gagal mendapatkan token pembayaran.", "error");
      }
    } catch (error) {
      showToast("Gagal!", error.message || "Terjadi kesalahan pada proses pembayaran.", "error");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = "SB-Mid-client-qM4oOLPph7RnCQpq";
  
    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    scriptTag.onload = () => setMidtransScriptLoaded(true);
    scriptTag.onerror = () => showToast("Gagal!", "Gagal memuat script Midtrans.", "error");
  
    document.body.appendChild(scriptTag);
  
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!order || !order._id) {
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
          Anda belum melakukan pemesanan, silahkan beli paket terlebih dahulu.
        </Text>
        <Link to={"/user/packet"}>
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid">
            Beli Paket
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box m={{ base: "none", md: "50" }} mt={10}>
      <Box p={{ base: 4, md: 10 }} bg={"#fff"}>
        <TableContainer>
          <Heading
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            size={{ base: "md", md: "lg" }}
            py={"2"}
          >
            Detail Pemesanan
          </Heading>
          <Divider />
          <Table variant="simple" size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                <Th>Detail Produk</Th>
                <Th>Id Pemesanan</Th>
                <Th>Nama Pemesan</Th>
                <Th>Paket Private</Th>
                <Th>Harga Paket</Th>
                <Th>Hapus</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Image
                    boxSize={{ base: "100px", md: "200px" }}
                    objectFit="cover"
                    src={order.packetCategory === 'manual' ? '/avansa.jpg' : '/image1.jpg'}
                    alt="Produk"
                  />
                </Td>
                <Td>{order._id}</Td>
                <Td>{order.username}</Td>
                <Td>{order.packetName}</Td>
                <Td fontWeight={"bold"}>{formatRupiah(order.price)}</Td>
                <Td>
                  <Button
                    size={"sm"}
                    isLoading={loading}
                    colorScheme="red"
                    onClick={deleteMyOrder}
                  >
                    <MdDeleteForever />
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex justifyContent="flex-end" mt={"3"} gap={"2"} wrap="wrap">
            <Button size={"sm"} colorScheme="twitter" onClick={onOpen}>
              Bayar Manual
            </Button>
            <Button size={"sm"} colorScheme="orange" onClick={handleMidtrans}>
              Bayar Virtual
            </Button>
          </Flex>
          <form onSubmit={handleManualPayment}>
            <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
                  Pembayaran Manual
                </ModalHeader>
                <Text fontSize="xs" as="mark" fontWeight={"bold"} textAlign="center">
                  Silahkan transfer ke No.Rek berikut:
                </Text>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  BNI: 1122334455, atas nama Suka Private Mengemudi
                </Text>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  BRI: 1122334455, atas nama Suka Private Mengemudi
                </Text>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Id Pemesanan</FormLabel>
                    <Input value={order._id} isReadOnly />
                  </FormControl>
                  <FormControl mt={"2"}>
                    <FormLabel>Paket Mengemudi</FormLabel>
                    <Input value={order.packetName} isReadOnly />
                  </FormControl>
                  <FormControl mt={"2"}>
                    <FormLabel>Total Harus di Bayar</FormLabel>
                    <Input value={order.price} isReadOnly />
                  </FormControl>
                  <FormControl mt={"2"}>
                    <FormLabel>Unggah Bukti Transfer</FormLabel>
                    <Input type="file" placeholder="Pilih foto" onChange={handleUpload} />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose} size={"sm"}>
                    Tutup
                  </Button>
                  <Button colorScheme="orange" size={"sm"} onClick={handleManualPayment}>
                    Bayar Sekarang
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </form>
        </TableContainer>
      </Box>
    </Box>

  );
}

export default Order;
