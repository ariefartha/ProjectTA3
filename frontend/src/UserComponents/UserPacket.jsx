import {
  ListIcon,
  Heading,
  Flex,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Button,
  ListItem,
  List,
  Center,
  Spinner,
  Box,
  Stack,
  Container,
  Divider,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.js";
import { useNavigate } from "react-router-dom";

const UserPacket = () => {
  const [packets, setPackets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("Matic");
  const [user, setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getPackets = async () => {
      try {
        const res = await fetch("/api/booking/getpacket");
        const data = await res.json();
        if (res.ok) {
          setPackets(data);
        }
      } catch (error) {
        showToast("Gagal!", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getPackets();
  }, []);

  const handleOrder = async (packetId) => {
    setLoading(true);
    try {
      if (!window.confirm("Apakah anda yakin membeli paket ini?")) return;
      const order = await fetch("/api/booking/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          packetId: packetId,
        }),
      });

      const result = await order.json();
      if (order.ok) {
        showToast("Sukses😊", result.message, "success");
        navigate("/user/order");
      } else {
        showToast("Gagal!", result.error, "error");
      }
    } catch (error) {
      showToast("Gagal!", error.message, "error");
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

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };  

  // Filter packets based on selectedType
  const displayedPackets = packets?.filter((data) =>
    selectedType === "Matic" ? data.category === "matic" : data.category === "manual"
  );

  return (
    <Box>
      <Stack spacing={4} as={Container} maxW={'3xl'} my={{ base: "2", md: "5" }}>
        <Center>
          <Heading bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text' fontSize={{ base: "20", md: "3xl" }}>Pilihan Paket Mengemudi
          </Heading>
        </Center>
        <Text textAlign={{ base: "justify", md: "center" }} color={'gray.600'}>
          Kami menawarkan 2 kategori paket belajar mengemudi dengan mobil matic ataupun manual yang dirancang untuk memenuhi berbagai kebutuhan dan tingkat keterampilan Anda.
        </Text>
      </Stack>
      <Divider />
      <Box textAlign="center" mt={5}>
        <Heading bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text' fontSize={{ base: "20", md: "3xl" }}>Pilih tipe mobil sesuai keinginan anda</Heading>
        <RadioGroup onChange={setSelectedType} value={selectedType}>
          <Stack direction="row" spacing={5} justifyContent="center" mx={{base:"2", md:"none"}}>
            <Radio value="Matic">Paket Mobil Matic Agya</Radio>
            <Radio value="Manual">Paket Mobil Manual Avansa tipe G</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Flex
        gap={8}
        fontFamily={"Poppins"}
        flexWrap="wrap"
        justifyContent="center"
        mt={{ base: "5", md: "10" }}
        mb={{ base: "10", md: "none" }}
      >
        {displayedPackets && displayedPackets.length > 0 ? (
          displayedPackets.map((data, index) => (
            <SimpleGrid mb={{ base: "none", md: "10" }} spacing={4} border="1px solid #ddd" w={250} key={index} transition="all 0.3s"
            _hover={{ transform: "scale(1.05)" }}>
              <Card justifyContent={"center"} alignItems={"center"}>
                <CardHeader textAlign={"center"}>
                  <Heading size="md">{data.packetName}</Heading>
                  <Flex alignItems="flex-start" justifyContent="center" mt={3}>
                    <Text
                      fontWeight={"bold"}
                      color="red.600"
                      fontSize="3xl"
                      order={2}
                    >
                      {formatRupiah(data.price)}
                    </Text>
                  </Flex>
                </CardHeader>
                <CardBody textAlign={"left"}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {data.text1}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {data.text2}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {data.text3}
                    </ListItem>
                  </List>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="twitter"
                    onClick={() => handleOrder(data._id)}
                    isLoading={loading[data._id]}
                  >
                    Pesan Sekarang
                  </Button>
                </CardFooter>
              </Card>
            </SimpleGrid>
          ))
        ) : (
          <Text>Paket tidak tersedia.</Text>
        )}
      </Flex>
    </Box>
  );
};

export default UserPacket;
