import {
    Stack,
    Image,
    Box,
} from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
const RegisterPage = () => {
    return (
        <Stack minH={"100vh"} 
        direction={{ base: "column", md: "row" }}
        justifyContent={"center"}
        alignItems={"center"}>
            <Box boxSize={{ base: "2sm", md: "md" }} display={{base:"none", md:"block"}}>
                <Image src="/register.png" alt="tentang kami"
                />
            </Box>
            <RegisterForm />
        </Stack>
    );
};

export default RegisterPage;
