import { Container, OrderedList, ListItem, Text, Box, Heading, Center } from '@chakra-ui/react'
import React from 'react'

const Rules = () => {
  return (
    <>
      <Container my={10} bg={"#fff"} p={5}>
        <Center mt={5} mb={"35px"}>
          <Heading>Syarat & Ketentuan</Heading>
        </Center>
        <Box mb={5}>
          <OrderedList spacing={3}>
          <Heading fontWeight={'bold'} size={"md"}>Jadwal Latihan</Heading>
          <ListItem>Senin s/d Sabtu Pukul: 09.00 - 18.00. Disesuaikan dengan permintaan peserta</ListItem>
          <ListItem>Minggu Pukul: 09.00 - 16.00. Disesuaikan dengan permintaan peserta</ListItem>
          </OrderedList>
        </Box>
        <Box>
        <OrderedList spacing={3}>
          <Heading fontWeight={'bold'} size={"md"}>Syarat dan Ketentuan</Heading>
          <ListItem>Jadwal latihan setiap 2 hari sekali</ListItem>
          <ListItem>Peserta yang tidak mengikuti latihan selama 1 bulan dengan atau tanpa pemberitahuan kepada admin "SUKA" P.M dianggap mengundurkan diri dan jika ingin melanjutkan kursus maka di wajibkan mengikuti prosedur seperti peserta baru. </ListItem>
          <ListItem>Jika peserta latihan sudah mengikuti latihan, maka uang pembayaran tidak dapat diambil kembali.</ListItem>
          <ListItem>Jika peserta kursus mengundurkan diri dengan atau tanpa kabar selama 1 bulan dan telah membayar biaya kursus, maka uang tersebut tidak dapat ditarik kembali atau diganti orang lain</ListItem>
          <ListItem>Peserta kursus dapat mengubah waktu latihan (apabila kondisi memungkinkan) dengan melaporkan ke admin "Suka Private Mengemudi"</ListItem>
          <ListItem>Peserta kursus yang telah mendapatkan jadwal apabila berhalangan hadir, wajib memberitahukan minimal 1 hari jadwal, apabila tidak maka dianggap telah mengikuti kursus.</ListItem>
          <ListItem>Peserta kursus wajib mengikuti prosedur latihan yang di tentukan oleh admin "Suka Private Mengemudi"</ListItem>
          <ListItem>Route sepenuhnya di tentukan oleh instruktur disesuaikan dengan kemampuan siswa.</ListItem>
        </OrderedList>
        </Box>
      </Container>
    </>
  )
}

export default Rules