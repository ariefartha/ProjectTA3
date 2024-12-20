import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Heading,
    TableContainer,
    Stack,
    Box
} from '@chakra-ui/react'

import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
const Jadwal = () => {
    return (
        <>
            <Stack m={10} alignItems={"center"}>
                <Box p={5}>
                <Heading color={"blue.400"} size={"md"}>jadwal belajar mengemudi anda</Heading>
                </Box>
                <TableContainer w={600}>
                    <Table variant='striped' color={"blue.400"}>
                        <Thead textAlign={"center"}> 
                            <Tr>
                                <Th>No</Th>
                                <Th>Tanggal</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>1</Td>
                                <Td>1 Januari 2024</Td>
                                <Td>Selesai</Td>
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>2 february 2024</Td>
                                <Td>Cancel</Td>
                            </Tr>
                            <Tr>
                                <Td>3</Td>
                                <Td>3 Maret 2024</Td>
                                <Td>Cancel</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    )
}

export default Jadwal