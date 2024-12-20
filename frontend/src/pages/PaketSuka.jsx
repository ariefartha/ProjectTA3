import {
  Box,
  Stack,
  ListIcon,
  Heading,
  Divider,
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
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const PaketSuka = () => {
  const [selectedType, setSelectedType] = useState("Matic");

  const PacketMatic = [
    {
      paket: "Paket Matic Pemula",
      rupiah: "Rp.",
      harga: "600ribu",
      list: ["5x latihan", "Jarak 20km", "1 jam belajar"]
    },
    {
      paket: "Paket Matic Silver",
      rupiah: "Rp.",
      harga: "760ribu",
      list: ["7x latihan", "Jarak 20km", "1 jam belajar"]
    },
    {
      paket: " Paket Matic Golden",
      rupiah: "Rp.",
      harga: "1juta",
      list: ["5x latihan", "Jarak 40km", "2 jam belajar"]
    },
  ];

  const PacketManual = [
    {
      paket: "Paket Manual Pemula",
      rupiah: "Rp.",
      harga: "400ribu",
      list: ["5x latihan", "Jarak 20km", "1 jam belajar"]
    },
    {
      paket: "Paket Manual Silver",
      rupiah: "Rp.",
      harga: "560ribu",
      list: ["7x latihan", "Jarak 20km", "1 jam belajar"]
    },
    {
      paket: "Paket Manual Golden",
      rupiah: "Rp.",
      harga: "800ribu",
      list: ["5x latihan", "Jarak 40km", "2 jam belajar"]
    },
    {
      paket: "Paket Manual VVIP",
      rupiah: "Rp.",
      harga: "960ribu",
      list: ["6x latihan", "jarak 40km", "2 jam belajar"]
    }
  ];

  const displayedPackets = selectedType === "Matic" ? PacketMatic : PacketManual;

  return (
    <>
      <Box mt={10} fontFamily={"Poppins"}>
        <Stack spacing={4} width={"100%"} direction={"column"}>
          <Stack
            p={5}
            alignItems={"center"}
            justifyContent={{
              base: "flex-start",
              md: "space-around",
            }}
            direction={{
              base: "column",
              md: "row",
            }}
          >
            <Stack
              width={{
                base: "100%",
                md: "40%",
              }}
              textAlign={"center"}
            >
              <Heading size={"lg"}>
                Pilih paket terbaik anda untuk{" "}
                <Text color="purple.400">Belajar Mengemudi</Text>
              </Heading>
            </Stack>
            <Stack
              width={{
                base: "100%",
                md: "60%",
              }}
            >
              <Text textAlign={"center"} fontSize={{ base: "sm", md: "md" }}>
                Suka private belajar mengemudi adalah solusi terbaik buat anda
                yang ingin belajar mengemudi dengan instruktur yang
                berpengalaman.
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
      </Box>

      {/* Pilihan Matic atau Manual */}
      <Box textAlign="center" mt={5}>
        <Heading size={"lg"}  bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'>Pilih tipe mobil sesuai keinginan anda</Heading>
        <RadioGroup onChange={setSelectedType} value={selectedType}>
          <Stack direction="row" spacing={5} justifyContent="center">
            <Radio value="Matic">Paket Mobil Matic Agya</Radio>
            <Radio value="Manual">Paket Mobil Manual Avansa tipe G</Radio>
          </Stack>
        </RadioGroup>
      </Box>

      {/* Display Card Based on Selection */}
      <Flex pt={10} px={2} gap={8} fontFamily={"Poppins"} flexWrap="wrap" justifyContent="center">
        {displayedPackets.map((paket, index) => (
          <SimpleGrid
            spacing={4}
            w={{ base: "100%", md: 250 }}
            key={index}
            transition="all 0.3s" _hover={{ transform: "scale(1.05)" }}
          >
            <Card justifyContent={"center"} alignItems={"center"}>
              <CardHeader textAlign={"center"}>
                <Heading size="md">{paket.paket}</Heading>
                <Flex alignItems="flex-start" justifyContent="center" mt={10}>
                  <Text fontSize="sm" color="blue.600" order={1}>
                    {paket.rupiah}
                  </Text>
                  <Text fontWeight={"bold"} color="red.600" fontSize="3xl" order={2}>
                    {paket.harga}
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody textAlign={"left"}>
                <List spacing={3}>
                  {paket.list.map((item, i) => (
                    <ListItem key={i}>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {item}
                    </ListItem>
                  ))}
                </List>
              </CardBody>
              <CardFooter>
                <Link to={"/auth/login"}>
                <Button colorScheme="twitter">Pilih Paket</Button>
                </Link>
              </CardFooter>
            </Card>
          </SimpleGrid>
        ))}
      </Flex>
    </>
  );
};

export default PaketSuka;
