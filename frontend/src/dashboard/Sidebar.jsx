import { Box, Button, Flex, Text, FormControl, Textarea, Link, Image, Avatar, Tooltip, Modal, ModalOverlay, ModalContent, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaFilePdf } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MdOutlinePostAdd } from "react-icons/md";
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast.js'
import { useState } from 'react'

const MAX_CHAR = 150;

const Sidebar = () => {
    const setUser = useSetRecoilState(userAtom);
    const user = useRecoilValue(userAtom);
    const showToast = useShowToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false);
    const [testimoniText, setTestimoniText] = useState('');
    const [remainingCharacter, setRemainingCharacter] = useState(MAX_CHAR);

    const handleTextChange = async (e) => {
        const inputText = e.target.value;

        if (inputText.length > MAX_CHAR) {
            truncatedText = inputText.slice(0, MAX_CHAR);
            setTestimoniText(truncatedText);
            setRemainingCharacter(0)
        } else {
            setTestimoniText(inputText);
            setRemainingCharacter(MAX_CHAR - inputText.length)
        }

    }

    const handleCreateTestimoni = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/testimoni/posttestimoni", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postedBy: user._id, comments: testimoniText })
            })

            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error")
                return;
            }
            showToast("Success", "Komentar testimoni anda berhasil di kirim", "success");
            onClose();
            setTestimoniText("");
        } catch (error) {
            showToast("Error", error, "error")
        } finally {
            setLoading(false)
        }
    }

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
    const sidebarItems = [
        {
            icon: <FaHome size={25} />,
            text: "Beranda",
            link: "/user"
        },
        {
            icon: <FaFileUpload size={25} />,
            text: "Upload Pembayaran",
            link: "/user"
        },
        {
            icon: <FaFilePdf size={25} />,
            text: "sertifikat",
            link: "/user"
        },
        {
            icon: <Avatar size={"sm"} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />,
            text: "profile",
            link: "/user"
        }
    ]
    return (
        <Box
            height={"100vh"}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.300"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            px={{ base: 2, md: 4 }}
            fontFamily={"Poppins"}
        >
            <Flex direction={"column"}
                gap={10}
                w={"full"}
                h={"full"}>
                <Link to="/user" as={RouterLink} pl={2} cursor={"pointer"} >
                    <Image src='/logo.png'
                        w={"full"}
                        maxH={{ base: "10", md: "20" }}
                        alt='logo' />
                </Link>
                <Flex direction={"column"} gap={5} cursor={"pointer"}>
                    {sidebarItems.map((item, index) => (
                        <Tooltip
                            key={index}
                            hasArrow
                            label={item.text}
                            placement="right"
                            ml={1}
                            openDelay={200}
                            display={{ base: 'block', md: 'none' }}
                        >
                            <Link
                                display={"flex"}
                                to={item.link || null}
                                as={RouterLink}
                                alignItems={"center"}
                                gap={4}
                                _hover={{ bg: "whiteAlpha.400" }}
                                borderRadius={6}
                                p={2}
                                w={{ base: "10", md: "full" }}
                                justifyContent={{ base: "center", md: "flex-start" }}
                                color={"#fff"}
                            >
                                {item.icon}
                                <Box display={{ base: "none", md: "block" }}>
                                    {item.text}
                                </Box>
                            </Link>
                        </Tooltip>
                    ))}
                    <Tooltip
                        hasArrow
                        label={"Testimoni "}
                        placement="right"
                        ml={1}
                        openDelay={200}
                        display={{ base: 'block', md: 'none' }}

                    >
                        <Button
                            display={"flex"}
                            fontWeight={"normal"}
                            bg={"none"}
                            mt={"auto"}
                            alignItems={"center"}
                            gap={4}
                            _hover={{ bg: "whiteAlpha.400" }}
                            borderRadius={6}
                            p={2}
                            w={{ base: "10", md: "full" }}
                            justifyContent={{ base: "center", md: "flex-start" }}
                            color={"#fff"}
                            onClick={onOpen}
                        >
                            <MdOutlinePostAdd size={25} />
                            <Box display={{ base: "none", md: "block" }}>
                                Testimoni
                            </Box>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Testimoni</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Tuliskan komentar anda'
                                                onChange={handleTextChange}
                                                value={testimoniText}
                                            />
                                            <Text
                                                fontSize="xs"
                                                fontWeight={"bold"}
                                                textAlign={"right"}
                                                m={"1"}>
                                                {remainingCharacter}/{MAX_CHAR}
                                            </Text>
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={handleCreateTestimoni}
                                        isLoading={loading}
                                        >
                                            Kirim
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Button>
                    </Tooltip>
                </Flex>
                <Tooltip
                    hasArrow
                    label={"Logout"}
                    placement="right"
                    ml={1}
                    openDelay={200}
                    display={{ base: 'block', md: 'none' }}

                >
                    <Button
                        display={"flex"}
                        bg={"none"}
                        mt={"auto"}
                        alignItems={"center"}
                        gap={4}
                        _hover={{ bg: "whiteAlpha.400" }}
                        borderRadius={6}
                        p={2}
                        w={{ base: "10", md: "full" }}
                        justifyContent={{ base: "center", md: "flex-start" }}
                        color={"#fff"}
                        onClick={handleLogout}
                        isLoading={loading}
                    >
                        <LuLogOut size={25} />
                        <Box display={{ base: "none", md: "block" }}>
                            Logout
                        </Box>
                    </Button>
                </Tooltip>
            </Flex>
        </Box>
    )
}

export default Sidebar
