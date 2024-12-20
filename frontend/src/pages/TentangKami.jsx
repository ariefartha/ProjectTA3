import {
    Flex, Box, Stack,
    Heading, Text, Image,
    Button, Center,
} from "@chakra-ui/react"
import { MdOutlineStart } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";

const TentangKami = () => {
    return (
        <>
            <Flex mx={{ base: "0", md: "20" }} gap={10} py={{ base: "none", md: "20" }}
                fontFamily={"Poppins"}
                display={{ base: "row", md: "flex" }}
                justifyContent={"center"}>
                <Box boxSize={{ base: "2sm", md: "none" }}>
                    <Image h={{ base: "200", md: "350" }} w={600} src="/image1.jpg" alt="tentang kami"
                    />
                </Box>
                <Stack alignItems={"center"} maxW={"md"}>
                    <Heading fontSize={{ base: "20", md: "30" }}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'>Tentang Kami</Heading>
                    <Text mt={3} fontSize={{ base: "sm", md: "md" }} textAlign={"justify"} mx={{ base: "2", md: "0" }}>
                        Suka Private Mengemudi adalah tempat kursus belajar mengemudi di Jl. Raya Dr. Ir. Sukarno, Bedulu, Kec. Blahbatuh, Gianyar, Bali. Berdiri sejak 2021, kami fokus memberikan pengalaman belajar yang aman dan nyaman. Dengan instruktur berpengalaman, kami siap membantu Anda menguasai keterampilan mengemudi dengan baik.
                    </Text>
                    <Flex gap={5}>
                        <Box
                            _hover={{
                                color: "blue",
                            }}
                            transition={"0.2s ease-in-out "}

                        >
                            <Link to={"https://www.facebook.com/pages/Suka%20Private%20Mengemudi/418004015723601"}>
                                <FaFacebook color="blue" size={30} />
                            </Link>
                        </Box>
                        <Box
                            _hover={{
                                color: "blue",
                            }}
                            transition={"0.2s ease-in-out "}
                        >
                            <Link to={"https://www.instagram.com/suka_privatemengemudi/"}>
                                <FaInstagram color="tomato" size={30} />
                            </Link>
                        </Box>
                        <Box
                            _hover={{
                                color: "blue",
                            }}
                            transition={"0.2s ease-in-out "}
                        >
                            <Link to={"https://wa.me/6282341003232?."} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp color="green" size={30} />
                            </Link>
                        </Box>
                    </Flex>
                    <Box mt={3} pb={{ base: "5", md: "0" }}>
                        <Link to={"/auth/register"}>
                            <Button leftIcon={<MdOutlineStart />} colorScheme='blue' variant='outline'>
                                Daftar Sekarang
                            </Button>
                        </Link>
                    </Box>
                </Stack>

            </Flex>
            <Flex mx={{ base: "0", md: "20" }} gap={10} pt={{ base: "10", md: "0" }}
                fontFamily={"Poppins"}
                display={{ base: "row", md: "flex" }}
                alignItems={"center"}
                justifyContent={"center"}>
                <Stack alignItems={"center"} maxW={"md"}>
                    <Heading fontSize={{ base: "20", md: "30" }}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'>Misi Kami</Heading>
                    <Text mt={3} fontSize={{ base: "sm", md: "md" }} textAlign={"justify"} mx={{ base: "2", md: "0" }}>
                        "Misi kami di Suka Private Mengemudi adalah memberikan pengalaman belajar mengemudi yang aman, nyaman, dan profesional. Kami berkomitmen untuk membekali setiap siswa dengan keterampilan dan kepercayaan diri untuk menjadi pengemudi yang bertanggung jawab dan kompeten di jalan raya"
                    </Text>
                </Stack>
                <Box boxSize={{ base: "2sm", md: "sm" }}>
                    <Image src="/goal.png" alt="tentang kami"
                    />
                </Box>
            </Flex>
            <Center>
                <Heading fontSize={{ base: "20", md: "30" }}
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text' >Armada Kami</Heading>
            </Center>
            <Flex mx={{ base: "2", md: "40" }}
                gap={10}
                pt={{ base: "5", md: "10" }}
                fontFamily={"Poppins"}
                display={{ base: "row", md: "flex" }}
            >
                <Box boxSize={{ base: "2sm", md: "none" }} mb={{ base: "2", md: "none" }} transition="all 0.3s" _hover={{ transform: "scale(1.05)" }}>
                    <Image h={{ base: "200", md: "350" }} w={600} src="/image1.jpg" alt="tentang kami"
                    />
                </Box>
                <Box boxSize={{ base: "2sm", md: "none" }} transition="all 0.3s" _hover={{ transform: "scale(1.05)" }}>
                    <Image h={{ base: "200", md: "350" }} w={600} src="/avansa.jpg" alt="tentang kami"
                    />
                </Box>
                {/* <Stack alignItems={"center"} maxW={"md"}>
                    <Heading fontSize={{ base: "20", md: "30" }}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        mb={5}>Pencapaian Kami</Heading>
                    <Flex gap={5}>
                        <VStack
                            p={4}
                            textAlign={"center"}
                        >
                            <Heading fontWeight={"bold"} color="gold" fontSize="3xl">100+</Heading>
                            <Text>Siswa Pencapaian Kami</Text>
                        </VStack>
                        <VStack
                            p={4}
                            textAlign={"center"}
                        >
                            <Heading fontWeight={"bold"} color="gold" fontSize="3xl">100+</Heading>
                            <Text>Siswa Pencapaian Kami</Text>
                        </VStack>

                    </Flex>
                    <Flex gap={5}>
                        <VStack
                            p={4}
                            textAlign={"center"}
                        >
                            <Heading fontWeight={"bold"} color="gold" fontSize="3xl">100+</Heading>
                            <Text>Siswa Pencapaian Kami</Text>
                        </VStack>
                        <VStack
                            p={4}
                            textAlign={"center"}
                        >
                            <Heading fontWeight={"bold"} color="gold" fontSize="3xl">100+</Heading>
                            <Text>Siswa Pencapaian Kami</Text>
                        </VStack>
                    </Flex>
                    <Flex gap={5}>
                        <VStack
                            p={4}
                            textAlign={"center"}
                        >
                            <Heading fontWeight={"bold"} color="gold" fontSize="3xl">100+</Heading>
                            <Text>Siswa Pencapaian Kami</Text>
                        </VStack>
                        <VStack
                            p={4}
                            textAlign={"center"}
                        >
                            <Heading fontWeight={"bold"} color="gold" fontSize="3xl">100+</Heading>
                            <Text>Siswa Pencapaian Kami</Text>
                        </VStack>
                    </Flex>
                </Stack> */}
            </Flex>
            <Gallery />
        </>
    )
}

export default TentangKami