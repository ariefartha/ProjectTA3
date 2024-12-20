import {
    Box,
    Divider,
    Heading,
    Stack,
    Text,
    List,
    ListItem,
    ListIcon,
    Button
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
const Services = () => {
    const services = [
        {
            paket: 'PAKET A',
            text: ["hello", "hi", "neufhue", "neufhue", "neufhue"],
            harga: '900$',
        },
        {
            paket: 'PAKET B',
            text: ["hello", "hi", "neufhue", "neufhue", "neufhue"],
            harga: '900$',
        },
        {
            paket: 'PAKET C',
            text: ["hello", "hi", "neufhue", "neufhue", "neufhue"],
            harga: '900$',
        },
    ];

    return (
        <Box py={6} px={5} width="full">
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
                        <Text textAlign={"center"}>
                            Suka private belajar mengemudi adalah solusi terbaik buat anda
                            yang ingin belajar mengemudi dengan instruktur yang berpengalaman.
                        </Text>
                    </Stack>
                </Stack>
                <Divider />
                {services.map((service, index) => (
                <>
                <Stack
                    key={index}
                    p={3}
                    py={3}
                    justifyContent={{
                        base: "flex-start",
                        md: "space-around",
                    }}
                    direction={{
                        base: "column",
                        md: "row",
                    }}
                    alignItems={{ md: "center" }}
                    bg={"gray.100"}
                >
                    <Heading size={"md"}>{service.paket}</Heading>
                    
                    <List  spacing={3} textAlign="start">
                    {service.text.map((item, i) => (
                        <ListItem key={i}>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            {item}
                        </ListItem>
                        ))}
                    </List>
                    
                    <Heading size={{
                        base: "20px",
                        md: "10px",
                    }}>{service.harga}</Heading>
                    <Stack>
                        <Button
                            color="whiteAlpha.900"
                            bg="purple.400"
                            size="md">
                            Pilih paket
                        </Button>
                    </Stack>
                </Stack>
                <Divider />
                </>
                ))}
            </Stack>
        </Box>
    );
};

export default Services;
