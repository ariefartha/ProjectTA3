import React from 'react'
import { Image, Box, Stack, Container, Button } from '@chakra-ui/react'

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <Container alignItems={"center"}
        pt={10}
      >
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Box boxSize={{ base: "2sm", md: "sm" }}>
            <Image src="/notfound.png" alt="image1" />
          </Box>
          <Box>
            <Button 
            bg={"twitter.600"}
            color={"#fff"}
            _hover={{ bg: 'twitter.400', color: '#fff' }}
            onClick={goBack}
            >
              kembali ke halaman sebelumnya
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default NotFound
