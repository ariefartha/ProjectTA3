import {
    Heading,
    Box,
    Center,
    Spinner,
    Stack,
    TableContainer,
    Thead,
    Table,
    Td,
    Th,
    Tr,
    Tbody,
    Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { MdDelete } from "react-icons/md";

const InstructureList = () => {
    const showToast = useShowToast();
    const [instructure, setInstructure] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllUser = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://project-backend-six.vercel.app/api/users/getallinstructure");
                const data = await res.json();
                if (res.ok) {
                    setInstructure(data);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        getAllUser();
    }, []);

    const deleteUser = async (id) => {
        setLoading(true);
        try {
          if (!window.confirm("Apakah anda ingin menghapus data ini?")) return;
    
          const res = await fetch(`https://project-backend-six.vercel.app/api/users/delete/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.error) {
            showToast("Gagal!", data.error, "error");
            return;
          }
          showToast("Sukses😊", data.message, "success");
          setInstructure(instructure.filter((user) => user._id !== id));
        } catch (error) {
          showToast("Gagal", error, "error");
        } finally {
          setLoading(false);
        }
      };

    return (
        <Box mx={{ base: "none", md: "50px" }} mb={{ base: "none", md: "10" }}>
            <Center my={{ base: "none", md: "5" }}>
                <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
                    Daftar Instruktur
                </Heading>
            </Center>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
                {loading ? (
                    <Center>
                        <Spinner size="xl" />
                    </Center>
                ) : (
                    <TableContainer>
                        <Table variant="unstyled" bg="#fff" size="md" borderRadius="xl" boxShadow="xl">
                            <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
                                <Tr>
                                    <Th>Nama</Th>
                                    <Th>Email</Th>
                                    <Th>Telpon/Wa</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody fontSize={"sm"}>
                                {instructure.length > 0 ? (
                                    instructure.map((user) => (
                                        <Tr key={user.id}>
                                            <Td>{user.username}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.phone}</Td>
                                            <Td>
                                                <Button colorScheme="red" mr={2} onClick={() => deleteUser(user._id)}>
                                                    <MdDelete />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan={4} textAlign="center">
                                            Data tidak tersedia
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    );
};

export default InstructureList;
