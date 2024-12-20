import {
    Stack,
    Image,
    Box,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
const LoginPage = () => {
    return (
        <Stack minH={"100vh"}
            direction={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}>
            <LoginForm />
            <Box boxSize={{ base: "2sm", md: "md" }} display={{ base: "none", md: "block" }}>
                <Image src="/login.png" alt="login image"
                />
            </Box>
        </Stack>
    );
};

export default LoginPage;
