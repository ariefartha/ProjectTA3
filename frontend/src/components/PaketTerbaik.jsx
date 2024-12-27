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
    Divider,
    Center
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const PTerbaik = [
    {
        paket: "Silver",
        rupiah: "Rp.",
        harga: "560ribu",
        list: ["7x latihan", "Jarak 20km", "1 jam belajar"]
    },
    {
        paket: "Golden",
        rupiah: "Rp.",
        harga: "800ribu",
        list: ["5x latihan", "Jarak 40km", "2 jam belajar"]
    },
    {
        paket: "VVIP",
        rupiah: "Rp.",
        harga: "960ribu",
        list: ["6x pertemuan", "jarak 40km", "2 jam belajar"]
    }
];



const PaketTerbaik = () => {
    return (
        <>
            <Heading textAlign={"center"} fontSize={"2xl"}
                color={"#1d4ed8"}
                mb={{ base: "2", md: "10" }}
                mt={{ base: "0", md: "10" }}
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'>Paket Terbaik Suka Private Mengemudi
            </Heading>
            <Flex  gap={8}n px={"2"} mb={{base: "none", md: "10"}} fontFamily={"Poppins"} flexWrap="wrap" justifyContent="center">
                {PTerbaik.map((paket, index) => (
                    <SimpleGrid
                        spacing={4}
                        border="1px solid #ddd"
                        w={{ base: "100%", md: 250 }}
                        key={index}
                        transition="all 0.3s"
                        _hover={{ transform: "scale(1.05)" }}
                        
                    >
                        <Card justifyContent={"center"} alignItems={"center"} bg={"white"}>
                            <CardHeader textAlign={"center"}>
                                <Heading color={"#000"} size="md">{paket.paket}</Heading>
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
                                        <ListItem color="#1A202C">
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
    )
}

export default PaketTerbaik