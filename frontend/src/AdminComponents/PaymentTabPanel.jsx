import {
  Table, Thead, Th, Tr, Td, Tbody, HStack, Button, TableContainer, IconButton, Popover, PopoverTrigger,
  PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, CheckboxGroup, Checkbox,
  Stack, Box, Input, Flex, InputGroup, InputLeftElement, TableCaption, Modal, ModalBody, ModalCloseButton,
  ModalContent, useDisclosure, ModalOverlay, ModalHeader, ModalFooter, FormControl, FormLabel, Select
} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { MdDelete, MdFilterList, MdCalendarToday, MdSearch, MdLink, MdDownload, MdCalendarMonth } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import exportPdfPayment from "../hooks/exportPdfPayment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const PaymentTabPanel = ({ payment, deletePayment, formatDateToIndonesian, setPayment }) => {
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentMethodFilter, setPaymentMethodFilter] = useState([]);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [input, setInput] = useState({
    payment_status: '',
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  const handleMethodFilterChange = (values) => {
    setPaymentMethodFilter(values);
  };

  const handleStatusFilterChange = (values) => {
    setPaymentStatusFilter(values);
  };

  // Ketika tombol edit diklik, set data yang dipilih dan buka modal
  const handleEditClick = (item) => {
    setSelectedPayment(item);
    onOpen();
  };

  const updatePaymentStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/payment/status/${selectedPayment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Gagal!", data.error, "error");
      } else {
        setPayment((prevPayment) =>
          prevPayment.map((item) =>
            item._id === selectedPayment._id
              ? { ...item, payment_status: input.payment_status }
              : item
          )
        );
        showToast("Sukses", data.message, "success");
        onClose();
      }
    } catch (error) {
      showToast("Gagal!", error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  const handleMonthFilter = (date) => {
    setSelectedMonth(date);
  };

  const filteredPayment = payment
    .filter((item) =>
      paymentMethodFilter.length > 0 ? paymentMethodFilter.includes(item.typePayment) : true
    )
    .filter((item) =>
      paymentStatusFilter.length > 0 ? paymentStatusFilter.includes(item.payment_status) : true
    )
    .filter((item) =>
      selectedDate
        ? new Date(item.createdAt).toDateString() === selectedDate.toDateString()
        : true
    )
    .filter((item) =>
      selectedMonth
        ? new Date(item.createdAt).getMonth() === selectedMonth.getMonth() &&
          new Date(item.createdAt).getFullYear() === selectedMonth.getFullYear()
        : true
    )
    .filter((item) =>
      searchQuery
        ? item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.packetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.typePayment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.payment_status.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const exportPDF = exportPdfPayment(filteredPayment, formatDateToIndonesian, formatRupiah);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        {/* Search Bar */}
        <Box alignItems={"right"} mb={{base: "4", md: "2"}}>
          <Flex gap={1}>
            <InputGroup>
              <InputLeftElement>
                <MdSearch />
              </InputLeftElement>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='cari siswa'
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
            <Button leftIcon={<MdDownload />} colorScheme="blue" mb={4} onClick={exportPDF}>data</Button>
          </Box>
        </Flex>
      </Flex>
      {/* Tabel data */}
      <TableContainer>
        <Table variant="unstyled" bg="#fff" size="md" borderRadius="xl" boxShadow="xl">
          <TableCaption bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>© 2024 Suka Private Mengemudi. All Right Reserved</TableCaption>
          <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
            <Tr>
              <Th>Siswa</Th>
              <Th>Paket</Th>
              <Th>Harga</Th>
              <Th isNumeric>
                Metode
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      size="sm"
                      ml={2}
                      icon={<MdFilterList />}
                      aria-label="Filter Metode Pembayaran"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Filter Metode Pembayaran</PopoverHeader>
                    <PopoverBody>
                      <CheckboxGroup
                        value={paymentMethodFilter}
                        onChange={handleMethodFilterChange}
                      >
                        <Stack direction="column">
                          <Checkbox value="manual">Manual</Checkbox>
                          <Checkbox value="virtual">Virtual</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Th>
              <Th isNumeric>
                Status
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      size="sm"
                      ml={2}
                      icon={<MdFilterList />}
                      aria-label="Filter Status Pembayaran"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Filter Status Pembayaran</PopoverHeader>
                    <PopoverBody>
                      <CheckboxGroup
                        value={paymentStatusFilter}
                        onChange={handleStatusFilterChange}
                      >
                        <Stack direction="column">
                          <Checkbox value="menunggu verifikasi">Menunggu Verifikasi</Checkbox>
                          <Checkbox value="sukses">Sukses</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Th>
              <Th>Bukti</Th>
              <Th py={4} isNumeric>
                Tanggal
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      size="sm"
                      ml={2}
                      icon={<MdCalendarToday />}
                      aria-label="Filter Tanggal"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Pilih Tanggal</PopoverHeader>
                    <PopoverBody>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Pilih tanggal"
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Th>
              <Th py={4}>
                Aksi
              </Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"sm"} fontWeight="medium">
            {filteredPayment && filteredPayment.length > 0 ? (
              filteredPayment.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.username}</Td>
                  <Td>{item.packetName}</Td>
                  <Td>{formatRupiah(item.price)}</Td>
                  <Td>{item.typePayment}</Td>
                  <Td>{item.payment_status}</Td>
                  <Td>
                    {item.manualPaymentImg && (
                      <a href={item.manualPaymentImg} target="_blank" rel="noopener noreferrer">
                        <Button size={"sm"} as="span" colorScheme="blue" >
                          <MdLink />
                        </Button>
                      </a>
                    )}
                  </Td>

                  <Td fontWeight="medium">
                    {formatDateToIndonesian(item.createdAt)}
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        size={"sm"}
                        colorScheme="twitter"
                        variant="outline"
                        onClick={() => handleEditClick(item)}
                      >
                        <CiEdit />
                      </Button>
                      <Button
                        size={"sm"}
                        colorScheme="red"
                        onClick={() => deletePayment(item._id)}
                      >
                        <MdDelete />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="7" textAlign="center">
                  Data pembayaran tidak tersedia
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedPayment && (
        <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
              Ubah Status Pembayaran
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Status Pembayaran</FormLabel>
                <Select
                  mt={2}
                  value={selectedPayment.payment_status}
                  onChange={(e) => setInput({ ...input, payment_status: e.target.value })}
                >
                  <option value="sukses">Sukses</option>
                  <option value="menunggu verifikasi">menunggu verifikasi</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose} size={"sm"}>
                Tutup
              </Button>
              <Button colorScheme="twitter" isLoading={loading} size={"sm"} onClick={() => updatePaymentStatus(selectedPayment._id)}>
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PaymentTabPanel;
