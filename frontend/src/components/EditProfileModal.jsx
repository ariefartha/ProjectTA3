import React, { useState } from "react";
import {
  Button,
  Select,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast.js";
import userAtom from "../atoms/userAtom";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  const [input, setInput] = useState({
    username: user.username,
    email: user.email,
    address: user.address,
    phone: user.phone,
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); 
    setUpdating(true);
    try {
      const res = await fetch(`https://project-backend-six.vercel.app/api/users/updatemyprofile/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setUser(data.updatedUser); 
  
      showToast("Success", "Profile Berhasil diubah", "success");
      onClose(); 
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Edit Data Pribadi
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={input.username}
              onChange={(e) =>
                setInput({ ...input, username: e.target.value })
              }
              placeholder="Nama"
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Email</FormLabel>
            <Input
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, email: e.target.value })
              }
              placeholder="Email"
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>No Hp/Whatsapp</FormLabel>
            <Input
              value={input.phone}
              onChange={(e) =>
                setInput({ ...input, phone: e.target.value })
              }
              placeholder="No Hp/Wa"
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Alamat</FormLabel>
            <Input
              value={input.address}
              onChange={(e) =>
                setInput({ ...input, address: e.target.value })
              }
              placeholder="Alamat Lengkap"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            isLoading={updating}
            colorScheme="blue"
            onClick={handleUpdateProfile}
          >
            Kirim
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
