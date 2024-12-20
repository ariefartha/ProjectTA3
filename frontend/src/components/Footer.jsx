import {
  Box,
  VStack,
  Image,
  Text,
  Heading,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        p={{ base: "2", md: "20" }}
        mt={100}
        color={"white"}
        bg={"#1DA1F2"}
        fontFamily={"Poppins"}
        display={{ base: "column", md: "flex" }}
      >
        <VStack mb={{ base: "4", md: "0" }}>
          <Box>
            <Image
              src="/logo.png"
              w={"full"}
              maxH={{ base: "20", md: "20" }}
              alt="logo"
            />
          </Box>
          <Box>
            <Text fontSize={{ base: "12", md: "14" }}>Jl. Raya Dr. Ir. Sukarno, Bedulu, Gianyar.</Text>
          </Box>
        </VStack>
        <VStack mb={{ base: "4", md: "0" }} alignItems={{ base: "left", md: "center" }}>
          <Box>
            <Heading fontSize={{ base: "16", md: "18" }}>Menu</Heading>
          </Box>
          <Stack fontSize={{ base: "12", md: "14" }}>
            <Box _hover={{
              color: "yellow",
              fontWeight: "bold",
            }}
              transition={"0.2s ease-in-out "}><Link to={"/"}>Beranda</Link></Box>
            <Box _hover={{
              color: "yellow",
              fontWeight: "bold",
            }}
              transition={"0.2s ease-in-out "}><Link to={"/kontak"}>Kontak</Link></Box>
          </Stack>
        </VStack>
        <VStack mb={{ base: "4", md: "0" }} alignItems={{ base: "left", md: "center" }}>
          <Box>
            <Heading fontSize={{ base: "16", md: "18" }}>Tentang Kami</Heading>
          </Box>
          <Stack fontSize={{ base: "12", md: "14" }}
            _hover={{
              color: "yellow",
              fontWeight: "bold",
            }}
            transition={"0.2s ease-in-out "}>
            <Link to={"/about"}>Profile Perusahaan</Link>
          </Stack>
        </VStack>
        <VStack mb={{ base: "4", md: "0" }} alignItems={{ base: "left", md: "center" }}>
          <Box>
            <Heading fontSize={{ base: "14", md: "18" }}>Social Media</Heading>
          </Box>
          <Flex gap={5}>
            <Box
              _hover={{
                color: "yellow",
              }}
              transition={"0.2s ease-in-out "}

            >
              <Link to={"https://www.facebook.com/pages/Suka%20Private%20Mengemudi/418004015723601"}>
                <FaFacebook size={30} />
              </Link>
            </Box>
            <Box
              _hover={{
                color: "yellow",
              }}
              transition={"0.2s ease-in-out "}
            >
              <Link to={"https://www.instagram.com/suka_privatemengemudi/"}>
                <FaInstagram size={30} />
              </Link>
            </Box>
            <Box
              _hover={{
                color: "yellow",
              }}
              transition={"0.2s ease-in-out "}
            >
              <Link to={"https://wa.me/6282341003232?."} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={30} />
              </Link>
            </Box>
          </Flex>
        </VStack>
      </Flex>
      <Stack bg={"#1DA1F2"} fontFamily={"Poppins"}>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          w={"full"}
        >
          <Box flex={2} h={"1px"} bg={"whiteAlpha.600"} />
        </Flex>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          color={"white"}
          my={5}
        >
          <Text textAlign={"center"} fontSize={{ base: "12", md: "14" }}>© 2024 suka private mengemudi. All Right Reserved</Text>
        </Box>
      </Stack>
    </>
  );
};

export default Footer;
