import { Flex, VStack, Box, Text, Heading } from "@chakra-ui/react"
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { CiTimer } from "react-icons/ci";
import { MdMarkEmailRead } from "react-icons/md";

const Kontak = () => {
    return (

        <Flex fontFamily={"Poppins"} mt={{ base: "10", md: "20" }} justifyContent={"center"} gap={10} display={{ base: "column", md: "flex" }}>
            <VStack p={"20px"} alignItems={"left"}  w={{ base: "sm", md: "md" }}>
                <Heading mb={4} color={"gray.600"} fontSize={{ base: "20", md: "30" }}>Hubungi Kami</Heading>
                <Flex gap={5} >
                    <IoIosCall size={30} />
                    <Text as='b' color={"gray.500"} fontSize={{ base: "sm", md: "md" }}>Telpon/WhatsApp</Text>
                </Flex>
                <Flex gap={5} mb={3}>
                    <Text fontSize={{ base: "sm", md: "md" }} p={0} ml={12}>082146995456</Text>
                </Flex>
                <Flex gap={5} >
                    <FaLocationDot size={30} />
                    <Text as='b' color={"gray.500"} fontSize={{ base: "sm", md: "md" }}>Lokasi</Text>
                </Flex>
                <Flex gap={5} mb={3}>
                    <Text fontSize={{ base: "sm", md: "md" }} p={0} ml={12}>Jl. Raya Dr. Ir. Sukarno, Bedulu, Kec. Blahbatuh, Kabupaten Gianyar, Bali</Text>
                </Flex>
                <Flex gap={5} >
                    <CiTimer size={30} />
                    <Text as='b' color={"gray.500"} fontSize={{ base: "sm", md: "md" }}>Buka</Text>
                </Flex>
                <Flex gap={5} mb={3}>
                    <Text p={0} ml={12} fontSize={{ base: "sm", md: "md" }}>08.00 pagi - 17.00 sore</Text>
                </Flex>
                <Flex gap={5} >
                    <MdMarkEmailRead size={30} />
                    <Text as='b' color={"gray.500"} fontSize={{ base: "sm", md: "md" }}>Email</Text>
                </Flex>
                <Flex gap={5} mb={3}>
                    <Text p={0} ml={12} fontSize={{ base: "sm", md: "md" }}>sukaprivatemengemudi@gmail.com</Text>
                </Flex>
            </VStack>

            <Box
                p={"20px"}
                w={{ base: "sm", md: "md" }}
            >
                <iframe
                    className="maps"
                    title="Locations"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15783.137790255487!2d115.2924656!3d-8.5202973!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2173201bd4599%3A0x5cb70c0194ec46ce!2sSuka%20Private%20Mengemudi!5e0!3m2!1sid!2sid!4v1699757089489!5m2!1sid!2sid"
                    height={"400"}
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    width={"550"}
                />
            </Box>
        </Flex>

    )
}

export default Kontak
