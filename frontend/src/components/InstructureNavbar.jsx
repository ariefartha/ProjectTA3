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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast.js'
import userAtom from '../atoms/userAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';


export const InstructureNavbar = () => {
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState('none');
    const showToast = useShowToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const setUser = useSetRecoilState(userAtom);
    const user = useRecoilValue(userAtom);
    
    const handleLinkClick = () => {
        setDisplay('none');
    };

    //function logout
    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/josn",
                },
            })
            const data = await res.json();
            console.log(data);
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            localStorage.removeItem("userInfo");
            setUser(null);
        } catch (error) {
            showToast("Error", data.error, "error");
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex fontFamily={'Poppins'}>
            <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} bg={"#000"}>
                {/* Desktop */}
                <Box p={5}>
                    <Link to={"/admin"}>
                        <Image src='/logo1.png'
                            w={"full"}
                            maxH={{ base: "8", md: "16" }}
                            alt='logo' />
                    </Link>
                </Box>
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

                    <Link to="/services" onClick={handleLinkClick}>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contact"
                            my={2} w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}
                        >
                            Paket Mengemudi
                        </Button>
                    </Link>
                    <Link to="/kontak" onClick={handleLinkClick}>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Jadwal"
                            my={2} w="100%"
                            color={"#fff"}
                            _hover={{ color: "whiteAlpha.800" }}
                        >
                            Kontak
                        </Button>
                    </Link>
                    <Button
                        onClick={handleLogout}
                        as="a"
                        variant="ghost"
                        aria-label="login"
                        my={2} w="100%"
                        color={"#fff"}
                        _hover={{ color: "whiteAlpha.800" }}
                    >
                        Keluar
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
