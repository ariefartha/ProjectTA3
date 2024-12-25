import {
  Box, Flex, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead,
  Tr, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader,
  PopoverBody, CheckboxGroup, Stack, Checkbox, Button, FormControl, Select, HStack,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spinner, 
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { MdSearch, MdCalendarToday, MdFilterList, MdDelete, MdDownload, MdCalendarMonth } from "react-icons/md";
import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import DatePicker from "react-datepicker";
import useShowToast from "../hooks/useShowToast";
import exportPdfSchedule from "../hooks/exportPdfSchedule";

const ScheduleTabPanel = ({ schedules, setSchedules, formatDateToIndonesian }) => {
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedInstructure, setSelectedInstructure] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [instructure, setInstructure] = useState([]);

  const [input, setInput] = useState({
    status: "",
    scheduleId: "",
    userId: ""
  });

  const handleEditSchedule = (s, userId) => {
    setSelectedSchedule(s);
    setInput({
      ...input,
      scheduleId: s._id,
      status: s.status,
      userId: userId
    });
    onOpen();
  };

  const handleUpdateSchedule = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://project-backend-six.vercel.app/api/schedule/updatestatusbyadmin/${input.userId}`, {
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
        setSchedules((prevSchedules) =>
          prevSchedules.map((schedule) => {
            if (schedule.schedules.some((s) => s._id === input.scheduleId)) {
              return {
                ...schedule,
                schedules: schedule.schedules.map((s) =>
                  s._id === input.scheduleId ? { ...s, status: input.status } : s
                ),
              };
            }
            return schedule;
          })
        );
      }
    } catch (error) {
      showToast("Gagal", error, "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleMonthFilter = (date) => {
    setSelectedMonth(date); 
  };

  const filteredSchedules = schedules
    .filter(schedule =>
      searchQuery
        ? schedule.username.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .map(schedule => ({
      ...schedule,
      schedules: schedule.schedules.filter((s) => {
        const scheduleDate = new Date(s.startDate);
        const matchesStartTime = selectedStartTime
        ? scheduleDate.toLocaleDateString() === new Date(selectedStartTime).toLocaleDateString()
        : true;

          const matchesMonth = selectedMonth
          ? scheduleDate.getMonth() === selectedMonth.getMonth() &&
            scheduleDate.getFullYear() === selectedMonth.getFullYear()
          : true;

        const matchesInstructure = selectedInstructure.length > 0
          ? selectedInstructure.includes(s.instructure)
          : true;

        return matchesStartTime && matchesInstructure && matchesMonth;
      })
    }))
    .filter(schedule => schedule.schedules.length > 0);


  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = end - start;
    const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} jam ${minutes} menit`;
  };

  //fungsi untuk fetch api daftar instructure
  useEffect(() => {
    const getInstructure = async () => {
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
    getInstructure();
  }, []);

  const deleteSchedule = async (userId, id) => {
    setLoading(true);
    try {
      if (!window.confirm("Apakah Anda ingin menghapus jadwal ini?")) return;

      const res = await fetch(`https://project-backend-six.vercel.app/api/schedule/schedule/${userId}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.error) {
        showToast("Gagal!", data.error, "error");
        return;
      }
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) => ({
          ...schedule,
          schedules: schedule.schedules.filter((s) => s._id !== id)
        })).filter((schedule) => schedule.schedules.length > 0)
      );
      showToast("Sukses😊", data.message, "success");
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  const exportPdf = exportPdfSchedule(filteredSchedules, formatDateToIndonesian, calculateDuration);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Box alignItems={"right"} mb={{base: "4", md: "2"}}>
          <Flex gap={1}>
            <InputGroup>
              <InputLeftElement>
                <MdSearch />
              </InputLeftElement>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="cari siswa"
                htmlSize={20}
                width={{ base: "80%", md: "auto" }}
                bg={"#fff"}
              />
            </InputGroup>
          </Flex>
        </Box>
        <Flex gap={2}>
        <Popover>
            <PopoverTrigger>
              <Button>
                <MdCalendarMonth />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Pilih Bulan</PopoverHeader>
              <PopoverBody>
                <DatePicker
                  selected={selectedMonth}
                  onChange={handleMonthFilter}
                  placeholderText="Pilih Bulan"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  isClearable
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Box>
            <Button leftIcon={<MdDownload />} colorScheme="blue" mb={4} onClick={exportPdf}>data</Button>
          </Box>
        </Flex>
      </Flex>
      <TableContainer>
        <Table variant="unstyled" bg="#fff" size="md" borderRadius="xl" boxShadow="xl">
          <TableCaption bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
            © 2024 Suka Private Mengemudi. All Right Reserved
          </TableCaption>
          <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
            <Tr>
              <Th>Siswa</Th>
              <Th>
                Instruktur
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      size="sm"
                      ml={2}
                      icon={<MdFilterList />}
                      aria-label="Instruktur"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Pilih Instruktur</PopoverHeader>
                    <PopoverBody>
                      <CheckboxGroup
                        value={selectedInstructure}
                        onChange={setSelectedInstructure}
                      >
                        <Stack direction="column">
                          {instructure.map((ins) => (
                            <Checkbox key={ins._id} value={ins.username}>
                              {ins.username}
                            </Checkbox>
                          ))}
                        </Stack>
                      </CheckboxGroup>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Th>
              <Th>
                Jam Mulai
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      size="sm"
                      ml={2}
                      icon={<MdCalendarToday />}
                      aria-label="Filter Tanggal"
                      isClearable
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Pilih Tanggal Mulai</PopoverHeader>
                    <PopoverBody>
                      <DatePicker
                        selected={selectedStartTime}
                        onChange={(date) => setSelectedStartTime(date)}
                        placeholderText="Pilih Tanggal"
                        isClearable
                        dateFormat="dd/MM/yyyy"
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Th>
              <Th>Jam Selesai</Th>
              <Th>Durasi</Th>
              <Th>Status</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"sm"}>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) =>
                schedule.schedules.map((s, idx) => (
                  <Tr key={`${schedule.userId}-${idx}`}>
                    <Td fontWeight="medium">{schedule.username}</Td>
                    <Td fontWeight="medium">{s.instructure}</Td>
                    <Td fontWeight="medium">{formatDateToIndonesian(s.startDate)}</Td>
                    <Td fontWeight="medium">{formatDateToIndonesian(s.endDate)}</Td>
                    <Td fontWeight="medium">{calculateDuration(s.startDate, s.endDate)}</Td>
                    <Td fontWeight="medium">{s.status}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button size={"sm"} onClick={() => handleEditSchedule(s, schedule.userId)} colorScheme="twitter" variant="outline">
                          <CiEdit />
                        </Button>
                        <Button size={"sm"} onClick={() => deleteSchedule(schedule.userId, s._id)} colorScheme="red">
                          <MdDelete />
                        </Button>
                      </HStack>
                      {selectedSchedule && (
                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>Edit Status Belajar</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <FormControl isRequired>
                                Status

                                <Select
                                  mt={2}
                                  value={selectedSchedule.status}
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
                              <Button colorScheme='twitter' isLoading={loading} onClick={() => handleUpdateSchedule(input.userId)} >
                                Simpan
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      )}
                    </Td>
                  </Tr>
                ))
              )
            ) : (
              <Tr>
                <Td colSpan="6">
                  <Text align="center" color="gray.500">
                    Data tidak tersedia untuk filter yang dipilih.
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ScheduleTabPanel;
