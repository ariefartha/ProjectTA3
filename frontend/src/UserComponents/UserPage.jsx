import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  TableContainer,
  Box,
  TableCaption,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  Textarea,
  Spinner,
  Text,
  useDisclosure,
  HStack,
  Avatar,
  Flex
} from '@chakra-ui/react'
import { GoCommentDiscussion } from "react-icons/go";
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import useShowToast from '../hooks/useShowToast.js'
import userAtom from '../atoms/userAtom'

const MAX_CHAR = 150;

const UserPage = () => {
  const showToast = useShowToast();
  const [schedule, setSchedule] = useState([]);
  const [user, setUser] = useRecoilState(userAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    setLoading(true);
    try {
      const res = await fetch("https://project-backend-six.vercel.app/api/testimoni/posttestimoni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ postedBy: user._id, comments: testimoniText })
      });
      const data = await res.json();
      if (res.status === 201) {
        showToast("Sukses😊", data.message, "success");
        onClose();
        setTestimoniText("");
      } else {
        showToast("Gagal!", data.error, "error");
        onClose();
      }
    } catch (error) {
      showToast("Gagal!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://project-backend-six.vercel.app/api/schedule/byuserid/${user._id}`, {
          method: "GET",
        });
        const data = await res.json();
        setSchedule(data.schedule);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSchedule();
  }, [user._id]);

  // Fungsi untuk mengubah format tanggal ke format bahasa Indonesia
  const formatDateToIndonesian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fungsi untuk menghitung total durasi
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = end - start;
    const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} jam ${minutes} menit`;
  };

  return (
    <>
      <Box my={5} textAlign={"center"}>
        <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize={{ base: "20", md: "30" }} >Jadwal Belajar Mengemudi</Heading>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box mb={8} px={{ base: "2", md: "10" }}>
          <Flex justifyContent="space-between" alignItems="center">
            {/* <Button
              size={{ base: "sm", md: "md" }}
              p={2}
              my={2}
              leftIcon={<GoCommentDiscussion />}
              colorScheme="twitter"
              variant="outline"
              onClick={onOpen}
              display={{ base: "flex", md: "inline-flex" }} 
            >
              <Text display={{ base: "none", md: "inline" }}>Kirim Testimoni</Text> 
            </Button> */}

            <Flex gap={"2"} p={2}>
              <HStack>
                <Avatar size={"sm"} src='/status.png' />
                <Text fontSize={{ base: 'sm', md: "md" }} color={"gray"} fontWeight={"bold"}>Status: {user.graduated ? "Lulus" : "Belum Lulus"}</Text>
              </HStack>
              <HStack p={2}>
                <Avatar size={"sm"} src="/hands.png" />
                <Text fontSize={{ base: 'sm', md: "md" }} color={"gray"} fontWeight={"bold"}>Total Kursus: {user.totalStudy}</Text>
              </HStack>
            </Flex>
          </Flex>
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
          <TableContainer>
            <Table variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg" >
              <TableCaption bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>© 2024 Suka Private Mengemudi. All Right Reserved</TableCaption>
              <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
                <Tr>
                  <Th>No</Th>
                  <Th>Jam Mulai</Th>
                  <Th>Jam Berakhir</Th>
                  <Th>Durasi Belajar</Th>
                  <Th>Instruktur</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={"sm"}>
                {schedule && schedule.length > 0 ? (
                  schedule.map((item, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{formatDateToIndonesian(item.startDate)}</Td>
                      <Td>{formatDateToIndonesian(item.endDate)}</Td>
                      <Td>{calculateDuration(item.startDate, item.endDate)}</Td>
                      <Td>{item.instructure}</Td>
                      <Td>{item.status}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="5" textAlign="center">Jadwal Belum Tersedia</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  )
}

export default UserPage;
