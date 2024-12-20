import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Table, Thead, Tbody, Tr, Td, Th,  } from '@chakra-ui/react'

const Schedule = () => {
    return (
        <>
            <Box p={20}>
                    <Table>
                        <Thead bg={"#1e1e1e"} h={10}>
                            <Tr>
                                <Th>No</Th>
                                <Th>jadwal</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>1</Td>
                                <Td>millimetres (mm)</Td>
                                <Td>
                                    <DeleteIcon  mr={4} />
                                    <EditIcon />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>centimetres (cm)</Td>
                                <Td>
                                    <DeleteIcon  mr={4} />
                                    <EditIcon />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>3</Td>
                                <Td>metres (m)</Td>
                                <Td>
                                    <DeleteIcon  mr={4} />
                                    <EditIcon />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
            </Box>
        </>
    )
}

export default Schedule
