import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import useShowToast from '../hooks/useShowToast.js';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import OathGoogle from './OathGoogle.jsx';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    });

    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);
    const navigate = useNavigate();  // Hook untuk melakukan navigasi

    const handleSignup = async () => {
        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            } else {
                showToast("Success", data.message, "success");
            }

            // Redirect ke halaman login jika tidak ada error
            navigate('/auth/login');

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return (
        <Flex
            fontFamily={"Poppins"}
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}
                        textAlign={'center'}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'>
                        Daftar
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={1}>
                        <FormControl isRequired>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <Input type="text"
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                value={inputs.username} />
                        </FormControl>
                        <HStack>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email"
                                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                        value={inputs.email} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                            value={inputs.password} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Box>
                        </HStack>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>No.Tlpn/WhatsApp</FormLabel>
                                    <Input type="text"
                                        onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                                        value={inputs.phone} />
                                </FormControl>
                            </Box>
                        <FormControl isRequired>
                            <FormLabel>Alamat Lengkap</FormLabel>
                            <Input type="text"
                                onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
                                value={inputs.address} />
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSignup}>
                                Daftar
                            </Button>
                        </Stack>
                        <OathGoogle />
                        <Stack pt={2}>
                            <Text align={'center'}>
                                Sudah mempunyai akun? <Link to={"/auth/login"} color={'blue.400'}>Masuk</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
