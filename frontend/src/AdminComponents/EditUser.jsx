import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Spinner,
    useColorModeValue,
    Divider,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete, MdLink, MdUpload, MdUploadFile } from 'react-icons/md'
import uploadFile from "../hooks/uploadFile.js";

const EditUser = () => {
    const navigate = useNavigate();
    const showToast = useShowToast();
    const { id } = useParams();
    const { handleUpload, uploadImage } = uploadFile();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState(null);
    const [input, setInput] = useState({
        username: '',
        email: '',
        address: '',
        phone: '',
        certificate: '',
        schedule: '',
        graduated: '',
    });

    useEffect(() => {
        const getUserById = async () => {
            setDataLoading(true);
            try {
                const response = await fetch(`/api/users/getuserbyid/${id}`, {
                    method: "GET"
                });
                const data = await response.json();
                setData(data);
                setInput({
                    username: data.username,
                    email: data.email,
                    address: data.address,
                    phone: data.phone,
                    certificate: data.certificate,
                    schedule: data.schedule,
                    graduated: data.graduated,
                });
            } catch (error) {
                showToast("Gagal", error.message, "error");
            } finally {
                setDataLoading(false);
            }
        }
        getUserById();
    }, [id]);

    const updatedUser = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            const res = await fetch(`/api/users/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            const result = await res.json();
            if (result.error) {
                showToast("Gagal!", result.error, "error");
                return;
            } else {
                showToast("Sukses😊", result.message, "success");
            }
            navigate("/user-list");
        } catch (error) {
            showToast("Gagal!", error.message, "error");
        } finally {
            setLoading(false);
        }
    }

    const deleteCertificate = async () => {
        setLoading(true);
        try {
            if (!window.confirm("Apakah anda yakin ingin menghapus sertifikat ini?")) return;
            const res = await fetch(`/api/users/deletecertificate/${id}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (result.error) {
                showToast("Gagal", result.error, "error");
                return;
            }
            navigate("/user-list");
        } catch (error) {
            showToast("Gagal", error.message, "error");
        } finally {
            setLoading(false);
        }
    }

    const uploadCertificate = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            const res = await fetch(`/api/users/uploadcertificate/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ certificate: uploadImage }),
            });
            const result = await res.json();
            if (result.error) {
                showToast("Gagal!", result.error, "error");
                return;
            } else {
                showToast("Sukses😊", result.message, "success");
            }
            navigate("/user-list");
        } catch (error) {
            showToast("Gagal!", error.message, "error");
        } finally {
            setLoading(false);
        }
    }

    if (dataLoading) {
        return (
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <form onSubmit={updatedUser}>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={2}
                    w={'full'}
                    maxW={'sm'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>
                        Edit Data Peserta
                    </Heading>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="Username"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={input.username}
                            onChange={(e) => setInput({ ...input, username: e.target.value })}
                        />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, email: e.target.value })}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Alamat</FormLabel>
                        <Input
                            placeholder="alamat"
                            _placeholder={{ color: 'gray.500' }}
                            value={input.address}
                            onChange={(e) => setInput({ ...input, address: e.target.value })}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Telpon/Whatsapp</FormLabel>
                        <Input
                            placeholder="nomor telpon/whatsapp"
                            _placeholder={{ color: 'gray.500' }}
                            value={input.phone}
                            onChange={(e) => setInput({ ...input, phone: e.target.value })}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Status Siswa</FormLabel>
                        <Select
                            value={input.graduated ? "Lulus" : "Belum Lulus"}
                            onChange={(e) => setInput({ ...input, graduated: e.target.value === "Lulus" })}
                            type='text'
                        >
                            <option value="" disabled>
                                Pilih Status
                            </option>
                            <option value="Lulus">Lulus</option>
                            <option value="Belum Lulus">Belum Lulus</option>
                        </Select>
                    </FormControl>

                    <FormControl >
                        <FormLabel fontWeight={"bold"}>Sertifikat</FormLabel>
                        {input.certificate ? (
                            <Flex align="center" justifyContent={"center"} gap={2}>
                                <a href={input.certificate} target="_blank" rel="noopener noreferrer">
                                    <Button leftIcon={<MdLink />} as="span" colorScheme="blue" size="sm">
                                        Lihat
                                    </Button>
                                </a>
                                <Button leftIcon={<MdDelete />} isLoading={loading} onClick={deleteCertificate} as="span" colorScheme="red" size="sm">
                                    Hapus Sertifikat
                                </Button>
                            </Flex>
                        ) : (
                            <Button leftIcon={< MdUpload />} w={"full"} onClick={onOpen} colorScheme='orange'>Upload sertifikat</Button>
                        )}
                    </FormControl>
                    {/* Modal untuk upload file sertifikat */}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Upload Sertifikat</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>Pilih sertifikat</FormLabel>
                                    <Input type="file" placeholder="Pilih foto" onChange={handleUpload} />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button mr={3} colorScheme="green" onClick={onClose}>Kembali</Button>
                                <Button leftIcon={<MdUploadFile />} colorScheme="blue" isLoading={loading} onClick={uploadCertificate}>
                                    Upload
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Divider />
                    <Stack mt={2} spacing={6} direction={['column', 'row']}>
                        <Button
                            colorScheme='green'
                            w="full"
                            onClick={() => navigate('/user-list')}>
                            Batal
                        </Button>
                        <Button
                            colorScheme='twitter'
                            w="full"
                            type='submit'
                        >
                            Simpan
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}

export default EditUser;
