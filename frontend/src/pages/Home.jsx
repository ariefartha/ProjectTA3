import {
    Box,
    Button,
    Heading,
    Container,
    Text,
    Stack,
    Flex,
    Image,
    VStack,
    Divider,
    Center
} from "@chakra-ui/react";
import { MdOutlineStart } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaMoneyBill1 } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import PaketTerbaik from "../components/PaketTerbaik";
import { Link } from 'react-router-dom';
import Testimoni from "../components/Testimoni";
export default function Home() {
    return (
        <>
            <Container
                maxW={{ base: "block", md: "full" }}
                backgroundImage="url('/banners1.jpg')"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                fontFamily={"Poppins"}
                h={{ base: "none", md: "85vh" }}
            >
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}
                >
                </Stack>
            </Container>
            <Flex mx={{ base: "2", md: "20" }} gap={10}
                pt={{ base: "10", md: "20" }}
                
                fontFamily={"Poppins"}
                display={{ base: "row", md: "flex" }}
                justifyContent={"center"}>
                <Stack alignItems={"center"} maxW={"md"}>
                    <Heading fontSize={{ base: "20", md: "2xl" }}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'>Suka Private Mengemudi</Heading>
                    <Text mt={3} fontSize={{ base: "sm", md: "md" }} textAlign={"justify"} mx={{ base: "1", md: "0" }}>
                        Bergabunglah dengan Suka Private Mengemudi
                        hari ini dan dapatkan pengalaman belajar mengemudi yang menyenangkan, aman, dan efektif.
                        Jadilah pengemudi yang handal dan percaya diri bersama kami.
                    </Text>
                    <Box mt={3} pb={{ base: "5", md: "0" }}>
                        <Link to={"/auth/register"}>
                            <Button leftIcon={<MdOutlineStart />} colorScheme='blue' variant='outline'>
                                Daftar Sekarang
                            </Button>
                        </Link>
                    </Box>
                </Stack>
                <Box boxSize={{ base: "2sm", md: "none" }}>
                    <Image
                        h={{ base: "200", md: "350" }}
                        w={600} src="/gambar1.png" alt="tentang kami"
                        borderRadius={5}
                    />
                </Box>
            </Flex>

            <PaketTerbaik />
            <Box py={{ base: "none", md: "100" }}
                px={{ base: "2", md: "none" }}
                mt={5}
                backgroundRepeat="no-repeat"
                backgroundImage={{ base: "none", md: "url('/bgimage.jpg')" }}
                backgroundPosition="center"
                textAlign={"center"}
            >
                <Container
                    shadow="md"
                    borderWidth="1px"
                    fontSize={"30px"}
                    fontWeight={"bold"}
                    p={6}
                    bg={"white"}
                    maxW={"600px"}>
                    <Text fontWeight={"bold"}
                        fontFamily={"Montserrat"}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'>MARI BELAJAR MENGEMUDI BERSAMA SUKA PRIVATE MENGEMUDI</Text>

                    <Box>
                        <Link to={"/auth/register"}>
                            <Button mt={5} colorScheme='orange'>
                                PESAN PAKET SEKARANG
                            </Button>
                        </Link>
                    </Box>

                </Container>
            </Box>

            <Heading textAlign={"center"} fontSize={"2xl"}
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text' p={10}>Kenapa Memilih Suka Private Mengemudi?</Heading>
            <Center>
                <Divider color={"tomato"} w={200} />
            </Center>

            <Flex alignItems="center"
                fontFamily={'Poppins'}
                justifyContent={"space-between"}
                mx={{base:"none", md: "20"}}
                mt={{base:"none", md: "5"}}
                mb={{base:"none", md: "10"}}
                px={{base:"2", md:"none"}}
                display={{ base: "column", md: "flex" }}>
                <VStack p={5} shadow="md"
                    borderWidth="1px"
                    maxW={{base: "100%", md: "280"}}
                    textAlign="center"
                    alignContent={"center"} mb={4}
                    bg={"#fff"}
                    transition="all 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                >
                    <Box bg='gray.100' color="yellow.500" p={3} borderRadius="full" mx="auto" >
                        <FaCar size={70}
                        />
                    </Box>
                    <Heading mt={3} fontSize={{ base: "14", md: "18" }}
                        fontWeight={"bold"}>
                        Kategori Mobil
                    </Heading>
                    <Text mt={4} fontSize={{ base: "12", md: "14" }}>
                        Suka private mengemudi menyedikan mobil manual dan matic untuk menunjang proses belajar mengemudi.
                    </Text>
                </VStack>
                <VStack p={5} shadow="md"
                    borderWidth="1px"
                    maxW={{base: "100%", md: "280"}}
                    textAlign="center"
                    alignContent={"center"} mb={4}
                    bg={"#fff"}
                    transition="all 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                >
                    <Box bg='gray.100' color="yellow.500" p={3} borderRadius="full" mx="auto" >
                        <AiOutlineSchedule size={70}
                        />
                    </Box>
                    <Heading mt={3} fontSize={{ base: "14", md: "18" }}
                        fontWeight={"bold"}>
                        Jadwal Flexible
                    </Heading>
                    <Text mt={4} fontSize={{ base: "12", md: "14" }}>
                        Suka belajar mengemudi membuat jadwal sesuai dengan keinginan peserta dan juga ketersedian instruktur.
                    </Text>
                </VStack>
                <VStack p={5} shadow="md"
                    borderWidth="1px"
                    maxW={{base: "100%", md: "280"}}
                    textAlign="center"
                    alignContent={"center"} mb={4}
                    bg={"#fff"}
                    transition="all 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                >
                    <Box bg='gray.100' color="yellow.500" p={3} borderRadius="full" mx="auto" >
                        <FaMoneyBill1 size={70}
                        />
                    </Box>
                    <Heading mt={3} fontSize={{ base: "14", md: "18" }}
                        fontWeight={"bold"}>
                        Harga Competitif
                    </Heading>
                    <Text mt={4} fontSize={{ base: "12", md: "14" }}>
                        Suka private mengemudi menawarkan harga paket kursus mengemudi yang beragam dan juga kompetitif.
                    </Text>
                </VStack>
                <VStack p={5} shadow="md"
                    borderWidth="1px"
                    maxW={{base: "100%", md: "280"}}
                    textAlign="center"
                    alignContent={"center"} mb={4}
                    bg={"#fff"}
                    transition="all 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                >
                    <Box bg='gray.100' color="yellow.500" p={3} borderRadius="full" mx="auto" >
                        <FaPerson size={70} 
                        />
                    </Box>
                    <Heading mt={3} fontSize={{ base: "14", md: "18" }}
                        fontWeight={"bold"}>
                        Instruktur yang Kompeten
                    </Heading>
                    <Text mt={4} fontSize={{ base: "12", md: "14" }}>
                        Kursus belajar mengemudi di Suka private mengemudi di bimbing langsung oleh instruktur yang kompeten di bidangnya.
                    </Text>
                </VStack>
            </Flex>
            <Testimoni />
        </>
    );
}
