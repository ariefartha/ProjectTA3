import React, { useState } from "react";
import {
  Flex,
  Button,
  IconButton,
  Image,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  Center,
  MenuItem,
  MenuDivider,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaShoppingCart, FaShoppingBag, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast.js";
import EditProfileModal from "../components/EditProfileModal.jsx";
import userAtom from "../atoms/userAtom";

export const UserNavbar = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("none");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();

  const handleLinkClick = () => {
    setDisplay("none");
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.removeItem("userInfo");
      setUser(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex fontFamily={"Poppins"}>
      <Flex
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        bgGradient="linear(to-l, #7928CA, #7987a1)"
      >
        {/* Logo */}
        <Box p={5}>
          <Link to={"/user"}>
            <Image
              src="/logo.png"
              w={"full"}
              maxH={{ base: "8", md: "16" }}
              alt="logo"
            />
          </Link>
        </Box>

        {/* Desktop Menu */}
        <Flex display={{ base: "none", md: "flex" }}>
          <Link to="/user">
            <Button variant="ghost" color={"#fff"} my={5} w="100%">
              Dashboard
            </Button>
          </Link>
          <Link to="/user/rules">
            <Button variant="ghost" color={"#fff"} my={5} w="100%">
              Syarat & Ketentuan
            </Button>
          </Link>
          <Link to="/user/packet">
            <Button variant="ghost" color={"#fff"} my={5} w="100%">
              Paket Mengemudi
            </Button>
          </Link>
          <Link to="/user/certificate">
            <Button variant="ghost" color={"#fff"} my={5} w="100%">
              Sertifikat
            </Button>
          </Link>
        </Flex>

        {/* Desktop Icons */}
        <Flex
          mr={5}
          gap={"3"}
          display={{ base: "none", md: "flex" }}
          alignItems={"center"}
        >
          <Link to={"/user/post"}>
            <FaComment size={"25px"} color="#fff" />
          </Link>
          <Link to={"/user/mypurchase"}>
            <FaShoppingBag size={"25px"} color="#fff" />
          </Link>
          <Link to={"/user/order"}>
            <FaShoppingCart size={"25px"} color="#fff" />
          </Link>
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"}>
              <Avatar size={"md"} />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar size={"md"} />
              </Center>
              <br />
              <Center>
                <Text>Welcome, {user.username}</Text>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem onClick={onOpen}>Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Keluar</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Mobile Hamburger */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => setDisplay("flex")}
          display={{ base: "flex", md: "none" }}
        />
      </Flex>

      {/* Mobile Menu */}
      <Flex
        w={"100vw"}
        display={display}
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => setDisplay("none")}
          />
        </Flex>

        {/* Mobile Menu  */}
        <Flex flexDir="column" align="center">
          <Link to="/user" onClick={handleLinkClick}>
            <Button variant="ghost" my={5} w="100%">
              Dashboard
            </Button>
          </Link>
          <Link to="/user/rules" onClick={handleLinkClick}>
            <Button variant="ghost" my={5} w="100%">
              Syarat & Ketentuan
            </Button>
          </Link>
          <Link to="/user/packet" onClick={handleLinkClick}>
            <Button variant="ghost" my={5} w="100%">
              Paket Mengemudi
            </Button>
          </Link>
          <Link to="/user/certificate" onClick={handleLinkClick}>
            <Button variant="ghost" my={5} w="100%">
              Sertifikat
            </Button>
          </Link>

          {/* Mobile Icons */}
          <Flex gap={5} mt={5}>
            <Link to={"/user/post"} onClick={handleLinkClick}>
              <FaComment size={"25px"} />
            </Link>
            <Link to={"/user/mypurchase"} onClick={handleLinkClick}>
              <FaShoppingBag size={"25px"} />
            </Link>
            <Link to={"/user/order"} onClick={handleLinkClick}>
              <FaShoppingCart size={"25px"} />
            </Link>
          </Flex>

          {/* Avatar */}
          <Menu>
            <MenuButton as={Button} rounded={"full"} mt={5}>
              <Avatar size={"md"} />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <Center>
                <Text>Welcome, {user.username}</Text>
              </Center>
              <MenuDivider />
              <MenuItem onClick={onOpen}>Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Keluar</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <EditProfileModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
