import {
  Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer, Box, TableCaption, Button,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  ModalFooter, FormControl, Select, Center, Spinner, Popover, PopoverTrigger,
  PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, IconButton, Flex,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { MdCalendarToday, MdDownload } from 'react-icons/md';
import { CiEdit} from 'react-icons/ci';
import useShowToast from "../hooks/useShowToast";
import DatePicker from 'react-datepicker';
import userAtom from '../atoms/userAtom';
import exportPdfInstructureDashboard from '../hooks/exportPdfInstructureDashboard.js'

const InstructureDashboard = () => {
  const showToast = useShowToast();
  const [schedule, setSchedule] = useState([]);
  const [user] = useRecoilState(userAtom);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [datesWithData, setDatesWithData] = useState([]);

  const [input, setInput] = useState({
    status: "",
    scheduleId: "",
    userId: user._id
  });

  const filterDate = schedule.filter((item) =>
    selectedStartTime
      ? new Date(item.startDate).toDateString() === selectedStartTime.toDateString()
      : true
  );

  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/schedule/byuserid/${user._id}`, {
          method: 'GET',
        });
        const data = await res.json();
        if(data.error) {
          showToast("Gagal!", result.error, "error");
          return;
        } else {
          setSchedule(data.schedule);
        }
        const availableDates = data.schedule.map(item => new Date(item.startDate).setHours(0, 0, 0, 0));
        setDatesWithData(availableDates);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSchedule();
  }, [user._id]);

  const formatDateToIndonesian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = end - start;
    const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} jam ${minutes} menit`;
  };

  const handleOpenModal = (item) => {
    setSelectedSchedule(item);
    setInput({
      ...input,
      scheduleId: item._id,
      status: item.status
    });
    onOpen();
  };

  const handleUpdateSchedule = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/schedule/updatestatusbyinstructure/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduleId: input.scheduleId,
          status: input.status,
        }),
      });
      const result = await res.json();
      if (result.error) {
        showToast("Gagal!", result.error, "error");
        return;
      } else {
        showToast("Sukses😊", result.message, "success");

        const updatedSchedule = schedule.map(sch =>
          sch._id === input.scheduleId ? { ...sch, status: input.status } : sch
        );
        setSchedule(updatedSchedule);
      }
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleDayClassName = (date) => {
    const timestamp = date.setHours(0, 0, 0, 0);
    return datesWithData.includes(timestamp) ? '' : 'no-data-date';
  };

  const exportPDF = exportPdfInstructureDashboard(filterDate, formatDateToIndonesian, calculateDuration);

  return (
    <>
      <Box my={5} textAlign={'center'}>
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontSize={{ base: '20', md: '30' }}>
          Jadwal Belajar Siswa
        </Heading>
      </Box>
      {loading ? (
        <Center>
          <Spinner size={'xl'} />
        </Center>
      ) : (
        <Box mb={8} px={{ base: '2', md: '10' }}>
          <Flex justifyContent="space-between" alignItems="center">
          <Box mb={4}>
            <Popover placement="auto">
              <PopoverTrigger>
                <IconButton icon={<MdCalendarToday />} />
              </PopoverTrigger>
              <PopoverContent mx="auto" isCentered>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Pilih Tanggal</PopoverHeader>
                <PopoverBody>
                  <DatePicker
                    selected={selectedStartTime}
                    onChange={(date) => setSelectedStartTime(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Pilih Tanggal"
                    dayClassName={handleDayClassName}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Box>
          <Button size={"sm"} leftIcon={<MdDownload />} colorScheme="blue" mb={4} onClick={exportPDF}>data</Button>
          </Box>
          </Flex>
          <TableContainer>
            <Table variant="unstyled" bg="#fff" size="md" borderRadius="xl" boxShadow="xl">
              <TableCaption bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
                © 2024 Suka Private Mengemudi. All Right Reserved
              </TableCaption>
              <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
                <Tr>
                  <Th>Jam Mulai</Th>
                  <Th>Jam Berakhir</Th>
                  <Th>Durasi Belajar</Th>
                  <Th>Siswa</Th>
                  <Th>Status</Th>
                  <Th>Edit</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={"sm"} fontWeight="medium">
                {filterDate.length > 0 ? (
                  filterDate.map((item, index) => (
                    <Tr key={index}>
                      <Td>{formatDateToIndonesian(item.startDate)}</Td>
                      <Td>{formatDateToIndonesian(item.endDate)}</Td>
                      <Td>{calculateDuration(item.startDate, item.endDate)}</Td>
                      <Td>{item.student}</Td>
                      <Td>{item.status}</Td>
                      <Td>
                        <Button size={"sm"} colorScheme="twitter" variant="outline" onClick={() => handleOpenModal(item)}>
                          <CiEdit />
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>Edit Status</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <FormControl isRequired>
                                Status
                                <Select
                                  mt={2}
                                  value={input.status}
                                  onChange={(e) => setInput({ ...input, status: e.target.value })}
                                >
                                  <option value="Selesai">Selesai</option>
                                  <option value="Terjadwal">Terjadwal</option>
                                  <option value="Cancel">Cancel</option>
                                </Select>
                              </FormControl>
                            </ModalBody>
                            <ModalFooter>
                              <Button colorScheme='green' mr={3} onClick={onClose}>Batal</Button>
                              <Button colorScheme='twitter' onClick={handleUpdateSchedule}>
                                Simpan
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7} textAlign="center">Tidak ada jadwal pada tanggal ini.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <style>{`
        .no-data-date {
          color: #fff !important;
          background-color: red !important;
        }
      `}</style>
    </>
  );
};

export default InstructureDashboard;
