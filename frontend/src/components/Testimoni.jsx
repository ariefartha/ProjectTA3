import { Avatar, Box, HStack, Text, Flex, Center, Heading, Button } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';

const Testimoni = () => {
    const [testimoni, setTestimoni] = useState([]);
    const [visibleCount, setVisibleCount] = useState(2); // Jumlah data yang terlihat awalnya

    useEffect(() => {
        const getTestimoni = async () => {
            const res = await fetch("https://project-backend-six.vercel.app/api/testimoni/gettestimoni");
            const data = await res.json();

            if (res.ok) {
                setTestimoni(data);
            }
        }
        getTestimoni();
    }, []);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 2); // Tambah jumlah data yang terlihat
    };

    return (
        <Box>
            <Heading
                textAlign={"center"}
                fontSize={"2xl"}
                color={"#1d4ed8"}
                p={10}
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
            >
                Testimoni dari pelanggan kami
            </Heading>
            {testimoni.slice(0, visibleCount).map((data, index) => (
                <HStack justifyContent={"center"} mb={2} key={index}>
                    <Flex
                        w={"700px"}
                        h={"150px"}
                        gap={7}
                        border="1px solid #ddd"
                        borderRadius={8}
                        p={5}
                        alignItems={"center"}
                        bg={"#fff"}
                    >
                        <Box flexShrink={0}>
                            <Avatar color={"yellow.500"} bg='gray.100' icon={<AiOutlineUser fontSize='1.5rem' />} />
                        </Box>
                        <Box flex="1">
                            <Text>
                                {data.comments}
                            </Text>
                            <Text fontWeight={"bold"} mt={3}>{data.username}</Text>
                        </Box>
                    </Flex>
                </HStack>
            ))}
            {visibleCount < testimoni.length && (
                <Center mt={4}>
                    <Button onClick={loadMore}>lihat komentar lainnya</Button>
                </Center>
            )}
        </Box>
    );
}

export default Testimoni;
