import {
  Heading,
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FcComments, FcOvertime, FcDonate } from "react-icons/fc";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import PaymentTabPanel from "../AdminComponents/PaymentTabPanel";
import ScheduleTabPanel from "../AdminComponents/ScheduleTabPanel";
import TestimoniTabPanel from "../AdminComponents/TestimoniTabPanel";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [testimoni, setTestimoni] = useState([]);
  const showToast = useShowToast();
  const [payment, setPayment] = useState([]);
  const [loadingTestimoni, setLoadingTestimoni] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [schedules, setSchedules] = useState([]);

  // Fungsi untuk memformat tanggal dalam format Indonesia
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

  // Fungsi untuk mengambil jadwal
  useEffect(() => {
    const fetchSchedulesByDate = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/schedule/allschedule");
        const data = await res.json();
        if (res.ok) {
          setSchedules(data);
        }
      } catch (error) {
        showToast("Gagal!", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedulesByDate();
  }, []);

  // Fungsi untuk mengambil daftar pembayaran
  useEffect(() => {
    const getAllPayment = async () => {
      setLoadingPayment(true);
      try {
        const res = await fetch("/api/payment/paymentlist");
        const data = await res.json();
        if (res.ok) {
          setPayment(data);
        }
      } catch (error) {
        showToast("Gagal!", error.message, "error");
      } finally {
        setLoadingPayment(false);
      }
    };
    getAllPayment();
  }, []);

  // Fungsi untuk menghapus payment
  const deletePayment = async (id) => {
    setLoading(true);
    try {
      if (!window.confirm("Apakah anda ingin menghapus data ini?")) return;

      const res = await fetch(`api/payment/deletepayment/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Gagal!", data.error, "error");
        return;
      }
      setPayment((prevPayments) =>
        prevPayments.filter((item) => item._id !== id)
      );
      showToast("Sukses😊", data.message, "success");
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus testimoni
  const deleteTestimoni = async (id) => {
    setLoading(true);
    try {
      if (!window.confirm("Apakah anda ingin menghapus testimoni ini?")) return;
      const res = await fetch(`/api/testimoni/deletetestimoni/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Gagal!", data.error, "error");
        return;
      }

      // Hapus item dari state testimoni
      setTestimoni((prevTestimoni) =>
        prevTestimoni.filter((item) => item._id !== id)
      );
      showToast("Sukses😊", data.message, "success");
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil daftar testimoni siswa
  useEffect(() => {
    const getTestimoni = async () => {
      const res = await fetch("/api/testimoni/gettestimoni");
      const data = await res.json();
      if (res.ok) {
        setTestimoni(data);
      }
    };
    getTestimoni();
  }, []);
  

  return (
    <Tabs isFitted variant="enclosed">
      <TabList justifyContent={"center"}>
        <Box
          display={{ base: "column", md: "flex" }}
          gap={7}
          justifyContent={"center"}
        >
          <Tab w="full" px={2}>
            <Flex
              w="full"
              h={"120px"}
              gap={5}
              alignItems={"center"}
              border="1px solid #ddd"
              borderRadius={6}
              justifyContent={"center"}
              p={5}
              bg={"#fff"}
            >
              <Box bg={"gray.100"} p={3} rounded={"full"}>
                <FcOvertime size={35} />
              </Box>
              <Box>
                <Heading
                  my={2}
                  size={"md"}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                >
                  Jadwal Latihan
                </Heading>
                <Flex gap={2} alignItems={"center"}>
                  <Heading
                    size={"lg"}
                    color={"orange.500"}
                    fontFamily={"Lucida Handwriting"}
                  >
                    {schedules.length}
                  </Heading>
                  <Text>Siswa</Text>
                </Flex>
              </Box>
            </Flex>
          </Tab>

          <Tab w="full" px={2}>
            <Flex
              w="full"
              h={"120px"}
              gap={5}
              alignItems={"center"}
              border="1px solid #ddd"
              borderRadius={6}
              justifyContent={"center"}
              p={5}
              bg={"#fff"}
            >
              <Box bg={"gray.100"} p={3} rounded={"full"}>
                <FcDonate size={35} />
              </Box>
              <Box>
                <Heading
                  my={2}
                  size={"md"}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                >
                  Pembayaran
                </Heading>
                <Flex gap={2} alignItems={"center"}>
                  <Heading
                    size={"lg"}
                    color={"orange.500"}
                    fontFamily={"Lucida Handwriting"}
                  >
                    {payment.length}
                  </Heading>
                  <Text>Siswa</Text>
                </Flex>
              </Box>
            </Flex>
          </Tab>

          <Tab w="full" px={2}>
            <Flex
              w="full"
              h={"120px"}
              gap={5}
              alignItems={"center"}
              border="1px solid #ddd"
              borderRadius={6}
              justifyContent={"center"}
              p={5}
              bg={"#fff"}
            >
              <Box bg={"gray.100"} p={3} rounded={"full"}>
                <FcComments size={35} />
              </Box>
              <Box>
                <Heading
                  my={2}
                  size={"md"}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                >
                  Testimoni Siswa
                </Heading>
                <Flex gap={2} alignItems={"center"}>
                  <Heading
                    size={"lg"}
                    color={"orange.500"}
                    fontFamily={"Lucida Handwriting"}
                  >
                    {testimoni.length}
                  </Heading>
                  <Text>Siswa</Text>
                </Flex>
              </Box>
            </Flex>
          </Tab>
        </Box>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ScheduleTabPanel
            schedules={schedules}
            setSchedules={setSchedules}
            formatDateToIndonesian={formatDateToIndonesian}
          />
        </TabPanel>
        <TabPanel>
          {loadingPayment ? (
            <Spinner />
          ) : (
            <PaymentTabPanel
              deletePayment={deletePayment}
              payment={payment}
              setPayment={setPayment}
              formatDateToIndonesian={formatDateToIndonesian}
            />
          )}
        </TabPanel>
        <TabPanel>
            {loadingTestimoni ? (
              <Spinner />
            ) : (
          <TestimoniTabPanel
            testimoni={testimoni}
            formatDateToIndonesian={formatDateToIndonesian}
            deleteTestimoni={deleteTestimoni}
          />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AdminDashboard;
