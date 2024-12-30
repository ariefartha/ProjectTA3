import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast.js';
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom';
import OathGoogle from './OathGoogle'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    fetch('https://project-backend-six.vercel.app/api/users/login', {
        method: 'POST',
        credentials: 'include', // Ini penting untuk mengizinkan pengiriman cookie
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) // Ganti dengan data yang sesuai
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return (
        <Flex
            fontFamily={"Poppins"}
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}
                        textAlign={'center'}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'>
                        Masuk
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text"
                                value={inputs.username}
                                onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'}
                                    value={inputs.password}
                                    onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Tunggu"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleLogin}
                                isLoading={loading}>
                                Masuk
                            </Button>
                        </Stack>
                        <OathGoogle />
                        <Stack>
                            <Text align={'center'}>
                                belum punya akun? <Link to={"/auth/register"} >Daftar</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}