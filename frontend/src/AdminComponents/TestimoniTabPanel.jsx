import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Button, TableCaption } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

const TestimoniTabPanel = ({ testimoni, formatDateToIndonesian, deleteTestimoni }) => {
  const [datatestimoni, setDatatestimoni] = useState(testimoni);

  useEffect(() => {
    setDatatestimoni(testimoni);
  }, [testimoni]);

  return (
    <Box maxW="100%" overflowX="auto">
      <TableContainer>
        <Table variant="unstyled" bg="#fff" size="md" borderRadius="xl" boxShadow="xl">
          <TableCaption bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>© 2024 Suka Private Mengemudi. All Right Reserved</TableCaption>
          <Thead variant="unstyled" bg="#fff" size="lg" borderRadius="lg" boxShadow="lg">
            <Tr>
              <Th><strong>Nama siswa</strong></Th>
              <Th><strong>Komentar</strong></Th>
              <Th><strong>Tanggal Postingan</strong></Th>
              <Th><strong>Hapus</strong></Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"sm"}>
            {datatestimoni.map((item, index) => (
              <Tr key={index}>
                <Td>{item.username}</Td>
                <Td>{item.comments}</Td>
                <Td>{formatDateToIndonesian(item.createdAt)}</Td>
                <Td>
                  <Button
                    size={"sm"}
                    colorScheme="red"
                    onClick={() => deleteTestimoni(item._id)} 
                  >
                    <MdDelete />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TestimoniTabPanel;
