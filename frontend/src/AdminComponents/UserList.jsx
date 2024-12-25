import {
  Heading,
  Box,
  useDisclosure,
  Center,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import UserTable from "./UserTable";

const UserList = () => {
  const showToast = useShowToast();
  const [users, setUsers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    const getAllUser = async () => {
      setLoading(true); 
      try {
        const res = await fetch("https://project-backend-six.vercel.app/api/users/getalluser");
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        }
      } catch (error) {
        showToast("Gagal!", error, "error");
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
      setUsers(users.filter((user) => user._id !== id)); // Update the users state
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteScheduleArray = async (scheduleId) => {
    setLoading(true);
    try {
      if (!window.confirm("Apakah Anda ingin menghapus jadwal ini?")) return;

      const res = await fetch(`https://project-backend-six.vercel.app/api/schedule/schedule/${selectedUser._id}/${scheduleId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Gagal!", data.error, "error");
        return;
      }
      showToast("Sukses😊", data.message, "success");
      setSchedules(schedules.filter((schedule) => schedule._id !== scheduleId));
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user); // Set the selected user
    onOpen();
  };



  useEffect(() => {
    if (selectedUser) {
      const fetchSchedule = async () => {
        try {
          const res = await fetch(`https://project-backend-six.vercel.app/api/schedule/schedule/${selectedUser._id}`, {
            method: "GET",
          });
          const data = await res.json();
          setSchedules(data); 
        } catch (error) {
          showToast("Gagal!", error, "error");
        }
      };
      fetchSchedule();
    }
  }, [selectedUser]);

  const inputSchedule = async (scheduleData) => {
    setLoading(true);
    try {
      const res = await fetch(`https://project-backend-six.vercel.app/api/schedule/schedule/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });
      const result = await res.json();
      if (result.error) {
        showToast("Gagal!", result.error, "error");
        return;
      }
      showToast("Sukses😊", result.message, "success");

      // Fetch the updated schedules after adding a new schedule
      const updatedSchedulesRes = await fetch(`https://project-backend-six.vercel.app/api/schedule/schedule/${selectedUser._id}`, {
        method: "GET",
      });
      const updatedSchedules = await updatedSchedulesRes.json();
      setSchedules(updatedSchedules); 
    } catch (error) {
      showToast("Gagal!", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack mx={{ base: "none", md: "20px" }} mb={{base: "none", md:"10"}}>
      <Center my={{ base: "none", md: "5" }}>
        <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>Daftar Peserta</Heading>
      </Center>
      <Box bg={"#fff"}>
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <UserTable
            users={users}
            schedules={schedules}
            handleOpenModal={handleOpenModal}
            isOpen={isOpen}
            onClose={onClose}
            loading={loading}
            deleteUser={deleteUser}
            deleteScheduleArray={deleteScheduleArray}
            inputSchedule={inputSchedule}
          />
        )}
      </Box>
    </Stack>
  );
};

export default UserList;

