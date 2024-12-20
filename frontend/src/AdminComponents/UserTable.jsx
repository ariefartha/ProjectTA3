import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Center,
  Box,
  FormControl,
  Input,
  HStack,
  Select,
  FormLabel,
  Flex,
  InputGroup,
  InputLeftElement,
  TableCaption
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdDelete, MdDownload, MdSearch } from "react-icons/md";
import { CiCalendar, CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import exportPdfUserTable from "../hooks/exportPdfUserTable";

const UserTable = ({
  users,
  schedules,
  handleOpenModal,
  isOpen,
  onClose,
  loading,
  deleteUser,
  deleteScheduleArray,
  inputSchedule
}) => {
  const [input, setInput] = useState({
    startDate: "",
    endDate: "",
    instructure: "",
  });

  const [instructures, setInstructures] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const formatDateToIndonesian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const getInstructure = async () => {
      const res = await fetch("/api/users/getallinstructure");
      const data = await res.json();

      if (res.ok) {
        setInstructures(data);
      }
    };
    getInstructure();
  }, []);

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    handleOpenModal(user);
  };

  const filteredUsers = users.filter((user) =>
    searchQuery
      ? user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.paymentImg ? "Sudah Membayar" : "Belum Membayar").toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const exportPdf = exportPdfUserTable(filteredUsers);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mx={{base: "2", md: "0"}}>
        <Box alignItems={"right"} mb={{base: "4", md: "2"}}>
          <Flex gap={1}>
            <InputGroup>
              <InputLeftElement>
                <MdSearch />
              </InputLeftElement>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari"
                htmlSize={20}
                width="auto"
                bg={"#fff"}
              />
            </InputGroup>
          </Flex>
        </Box>
        <Box>
          <Button leftIcon={<MdDownload />} colorScheme="blue" mb={4} onClick={exportPdf}>data</Button>
        </Box>
      </Flex>
      <TableContainer>
        <Table variant="unstyled" bg="#fff" size="md" borderRadius="xl" boxShadow="xl">
          <TableCaption bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
            © 2024 Suka Private Mengemudi. All Right Reserved
          </TableCaption>
          <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
            <Tr>
              <Th>Nama</Th>
              <Th>Telpon/Wa</Th>
              <Th>Alamat</Th>
              <Th>Email</Th>
              <Th>Total Kursus</Th>
              <Th>Sertifikat</Th>
              <Th>Jadwal</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          {/* Table Body */}
          <Tbody fontSize={"sm"} fontWeight="medium">
            {filteredUsers.map((user, index) => (
              <Tr key={index}>
                <Td>{user.username}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.address}</Td>
                <Td>{user.email}</Td>
                <Td>{user.totalStudy}</Td>
                <Td>
                  {user.certificate ? (
                    "Tersedia"
                  ) : (
                    "Belum ada"
                  )}
                </Td>
                <Td>
                  <Button size={"sm"} onClick={() => handleModalOpen(user)} colorScheme="twitter">
                    <CiCalendar />
                  </Button>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Link to={`/admin/users/${user._id}`}>
                      <Button size={"sm"} colorScheme="twitter" variant="outline">
                        <CiEdit />
                      </Button>
                    </Link>
                    <Button
                      size={"sm"}
                      onClick={() => deleteUser(user._id)}
                      colorScheme="red"
                    >
                      <MdDelete />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent maxWidth="80%">
          <Center fontSize={20} fontWeight={"bold"} py={4} bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
            Jadwal Belajar Siswa
          </Center>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Schedules Table */}
            {schedules && schedules.length > 0 ? (
              <TableContainer>
                <Table variant="unstyled" bg="#fff" size="md" borderRadius="xl" boxShadow="xl">
                  <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
                    <Tr>
                      <Th>Jam Mulai</Th>
                      <Th>Jam Berakhir</Th>
                      <Th>Instruktur</Th>
                      <Th>Status</Th>
                      <Th>Hapus</Th>
                    </Tr>
                  </Thead>
                  <Tbody fontSize={"sm"}>
                    {schedules.map((item, index) => (
                      <Tr key={index}>
                        <Td>{formatDateToIndonesian(item.startDate)}</Td>
                        <Td>{formatDateToIndonesian(item.endDate)}</Td>
                        <Td>{item.instructure}</Td>
                        <Td>{item.status}</Td>
                        <Td>
                          <Button
                            mr={2}
                            colorScheme="red"
                            isLoading={loading}
                            onClick={() => deleteScheduleArray(item._id)}
                          >
                            <MdDelete />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Center>
                <Box>Jadwal Belum Tersedia</Box>
              </Center>
            )}
            {/* Input Schedule Form */}
            <FormControl isRequired mt={4}>
              <FormLabel>Jam Mulai</FormLabel>
              <Input
                type="datetime-local"
                value={input.startDate}
                onChange={(e) => setInput({ ...input, startDate: e.target.value })}
                placeholder="Masukkan Jadwal"
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Jam Berakhir</FormLabel>
              <Input
                type="datetime-local"
                value={input.endDate}
                onChange={(e) => setInput({ ...input, endDate: e.target.value })}
                placeholder="Masukkan Jadwal"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Instruktur</FormLabel>
              <Select
                placeholder="Pilih Instruktur"
                mt={2}
                value={input.instructure}
                onChange={(e) => setInput({ ...input, instructure: e.target.value })}
              >
                {instructures.map((instructure, index) => (
                  <option key={index} value={instructure.username}>
                    {instructure.username}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={() => inputSchedule(input)}
              colorScheme="blue"
              mt={2}
              isLoading={loading}
              w={"full"}
            >
              Tambah Jadwal
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserTable;
