import { useState } from 'react';
import {
    Flex,
    Button,
    IconButton,
    Image,
    Box,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    Center,
    MenuItem,
    MenuDivider,
    Text,
    useDisclosure,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    FormControl,
    Input,
    ModalFooter
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast.js'
import userAtom from '../atoms/userAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';


export const AdminNavbar = () => {
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState('none');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const setUser = useSetRecoilState(userAtom);
    const user = useRecoilValue(userAtom);
    const showToast = useShowToast();
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
    });

    const handleLinkClick = () => {
        setDisplay('none');
    };

    //function logout
    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await fetch("https://project-backend-six.vercel.app/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/josn",
                },
            })
            const data = await res.json();
            console.log(data);
            if (data.error) {
                showToast("Gagal!", data.error, "error");
                return;
            }
            localStorage.removeItem("userInfo");
            setUser(null);
        } catch (error) {
            showToast("Gagal!", data.error, "error");
        } finally {
            setLoading(false)
        }
    }

    const HandleAddInstructure = async () => {
        try {
            const res = await fetch("https://project-backend-six.vercel.app/api/users/addinstructure", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Gagal!", data.error, "error");
                return;
            } else {
                showToast("Sukses😊", data.message, "success");
            }
            setInputs("");
            onClose();
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return (
        <Flex fontFamily={'Poppins'}>
            <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} bgGradient='linear(to-l, #7928CA, #000)'>
                {/* Desktop */}
                <Box p={5}>
                    <Link to={"/admin"}>
                        <Image src='/logo1.png'
                            w={"full"}
                            maxH={{ base: "8", md: "16" }}
                            alt='logo' />
                    </Link>
                </Box>
                <Flex display={{ base: "none", md: "flex" }}>
                    <Link to="/admin">
                        <Button as="a" color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }} variant="ghost" aria-label="Home" my={5} w="100%">
                            Dashboard
                        </Button>
                    </Link>

                    <Link to="/user-list">
                        <Button as="a" variant="ghost" color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }} aria-label="About" my={5} w="100%">
                            Peserta
                        </Button>
                    </Link>

                    <Link to="/instructure-list">
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contact"
                            my={5}
                            w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}
                        >
                            Instruktur
                        </Button>
                    </Link>
                    <Link to="/packet-list">
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contact"
                            my={5}
                            w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}
                        >
                            Paket
                        </Button>
                    </Link>
                </Flex>
                <Flex mr={5} display={{ base: "none", md: "flex" }}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'md'}
                            />
                        </MenuButton>
                        <MenuList alignItems={'center'}>
                            <br />
                            <Center>
                                <Avatar size={'md'} />
                            </Center>
                            <br />
                            <Center>
                                <Flex gap={1}>
                                    <Text>Welcome</Text>
                                    <Text fontWeight={"bold"}>{user.username}</Text>
                                </Flex>
                            </Center>
                            <br />
                            <MenuDivider />
                            <MenuItem>Edit Profile</MenuItem>
                            {user.role === 'admin' && (
                                <MenuItem onClick={onOpen}>Tambah Instruktur</MenuItem>
                            )}
                            <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>Tambah Instruktur</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl isRequired pt={2}>
                                            Nama Instruktur
                                            <Input
                                                type='text'
                                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                                value={inputs.username}
                                            />
                                        </FormControl>
                                        <FormControl isRequired pt={2}>
                                            Email
                                            <Input
                                                type='email'
                                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                                value={inputs.email}
                                            />
                                        </FormControl>
                                        <FormControl isRequired pt={2}>
                                            Password
                                            <Input
                                                type='password'
                                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                                value={inputs.password}
                                            />
                                        </FormControl>
                                        <FormControl isRequired pt={2}>
                                            Telpon/Wa
                                            <Input
                                                type='text'
                                                onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                                                value={inputs.phone}
                                            />
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='green' mr={3} onClick={onClose}>
                                            Batal
                                        </Button>
                                        <Button isLoading={loading} colorScheme='twitter' onClick={HandleAddInstructure}>Tambah</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                {/* Mobile */}
                <IconButton
                    aria-label="Open Menu"
                    size="lg"
                    mr={2}
                    icon={<HamburgerIcon />}
                    onClick={() => setDisplay('flex')}
                    display={{ base: "block", md: "none" }}
                />
            </Flex>
            {/* Mobile Content */}
            <Flex
                w="100vw"
                p={0}
                m={0}
                display={display}
                bg={"blue.500"}
                zIndex={20}
                h="70vh"
                position={"fixed"}
                top="0"
                left="0"
                overflow={"auto"}
                flexDirection={"column"}
            >
                <Flex justify="flex-end">
                    <IconButton
                        mt={2}
                        mr={2}
                        aria-label="Close Menu"
                        size="lg"
                        icon={<CloseIcon />}
                        onClick={() => setDisplay('none')}
                    />
                </Flex>

                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Link to="/" onClick={handleLinkClick}>
                        <Button as="a" variant="ghost" aria-label="Home" my={2} w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}>
                            Dashboard
                        </Button>
                    </Link>

                    <Link to="/user-list" onClick={handleLinkClick}>
                        <Button as="a" variant="ghost" aria-label="About" my={2} w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}>
                            Peserta
                        </Button>
                    </Link>

                    <Link to="/instructure-list" onClick={handleLinkClick}>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contact"
                            my={2} w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}
                        >
                            Instruktur
                        </Button>
                    </Link>
                    <Link to="/packet-list" onClick={handleLinkClick}>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Jadwal"
                            my={2} w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}
                        >
                            Paket
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
};
