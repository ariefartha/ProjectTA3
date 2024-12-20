import { useState } from 'react';
import {
  Flex,
  Button,
  IconButton,
  Image,
  Box,
  ButtonGroup
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [display, setDisplay] = useState('none');

  const handleLinkClick = () => {
    setDisplay('none');
  };

  return (
    <Flex fontFamily={'Poppins'}>
      <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} bg={"blue.400"}>
        {/* Desktop */}
        <Box p={4}>
          <Link to={"/"}>
            <Image src='/logo.png'
              w={"full"}
              maxH={{ base: "10", md: "20" }}
              alt='logo' />
          </Link>
        </Box>
        <Flex display={{ base: "none", md: "flex" }}>
          <Link to="/">
            <Button as="a" color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }} variant="ghost" aria-label="Home" my={5} w="100%">
              Beranda
            </Button>
          </Link>

          <Link to="/about">
            <Button as="a" variant="ghost" color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }} aria-label="About" my={5} w="100%">
              Tentang Kami
            </Button>
          </Link>

          <Link to="/services">
            <Button
              as="a"
              variant="ghost"
              aria-label="Contact"
              my={5}
              w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}
            >
              Paket Mengemudi
            </Button>
          </Link>
          <Link to="/kontak">
            <Button
              as="a"
              variant="ghost"
              aria-label="Kontak"
              my={5}
              w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}
            >
              Kontak
            </Button>
          </Link>
        </Flex>
        <Flex mr={4} display={{ base: "none", md: "flex" }}>
          <ButtonGroup variant='outline' spacing='6'>
            <Link to={"/auth/login"}>
              <Button
                color={"#fff"}
                _hover={{ color: "whiteAlpha.800" }}>Masuk</Button>
            </Link>
            <Link to={"/auth/register"}>
              <Button color={"#fff"} _hover={{ color: "whiteAlpha.800" }}>Daftar</Button>
            </Link>
          </ButtonGroup>
        </Flex>

        {/* Mobile */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => setDisplay('flex')}
          display={{ base: "block", md: "none" }}
        />
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        p={0}
        m={0}
        display={display}
        bg={"blue.500"}
        zIndex={20}
        h="70vh"
        position={"fixed"}
        top="0"
        left="0"
        overflow={"auto"}
        flexDirection={"column"}
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => setDisplay('none')}
          />
        </Flex>

        <Flex flexDirection={"column"} alignItems={"center"}>
          <Link to="/" onClick={handleLinkClick}>
            <Button as="a" variant="ghost" aria-label="Home" my={2} w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}>
              Beranda
            </Button>
          </Link>

          <Link to="/about" onClick={handleLinkClick}>
            <Button as="a" variant="ghost" aria-label="About" my={2} w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}>
              Tentang Kami
            </Button>
          </Link>

          <Link to="/services" onClick={handleLinkClick}>
            <Button
              as="a"
              variant="ghost"
              aria-label="Contact"
              my={2} w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}
            >
              Paket Mengemudi
            </Button>
          </Link>
          <Link to="/kontak" onClick={handleLinkClick}>
            <Button
              as="a"
              variant="ghost"
              aria-label="Jadwal"
              my={2} w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}
            >
              Kontak
            </Button>
          </Link>
          <Link to="/auth/login" onClick={handleLinkClick}>
            <Button
              as="a"
              variant="ghost"
              aria-label="login"
              my={2} w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}
            >
              Masuk
            </Button>
          </Link>
          <Link to="/auth/register" onClick={handleLinkClick}>
            <Button
              as="a"
              variant="ghost"
              aria-label="signup"
              my={2} w="100%"
              color={"#fff"}
              _hover={{ color: "whiteAlpha.800" }}
            >
              Daftar
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
