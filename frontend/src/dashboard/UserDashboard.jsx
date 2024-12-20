import {
  Heading,
  Box,
  Flex,
  Text,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { RiRedPacketFill } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { FaListCheck } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import Jadwal from "../UserComponents/Jadwal";
import UserPacket from "../UserComponents/UserPacket";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";

const UserDashboard = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    username : user.username,
  });

  return (
    <Tabs>
      <Flex>
        <Box w={{ base: "70px", md: "240px" }} bgColor={"#1DA1F2"}>
          <Sidebar />
        </Box>
        <Box w={"full"} fontFamily={"Poppins"}>
          <Heading
            fontSize={{ base: "12", md: "16" }}
            p={5}
            textAlign={"right"}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Selamat Datang {inputs.username}
          </Heading>
          <Box flex={2} h={"2px"} bg={"blackAlpha.100"} />
          <Box>
            <Heading
              p={2}
              size={"lg"}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              Dahsboard
            </Heading>
          </Box>
          <TabList>
            <HStack justifyContent="center" color={"blackAlpha.800"}>
              <Tab>
                <Flex
                  height={"40px"}
                  w={"250px"}
                  h={"100px"}
                  gap={5}
                  alignItems={"center"}
                  border="1px solid #ddd"
                  borderRadius={6}
                  justifyContent={"center"}
                  p={5}
                  bg={"#fff"}
                >
                  <Box>
                    <RiRedPacketFill size={35} />
                  </Box>
                  <Box>
                    <Heading size={"sm"}>Paket Private</Heading>
                    <Text size={"sm"}>belum tersedia</Text>
                  </Box>
                </Flex>
              </Tab>
              <Tab>
                <Flex
                  height={"40px"}
                  w={"250px"}
                  h={"100px"}
                  gap={5}
                  alignItems={"center"}
                  border="1px solid #ddd"
                  borderRadius={6}
                  justifyContent={"center"}
                  p={5}
                  bg={"#fff"}
                >
                  <Box>
                    <AiFillSchedule size={35} />
                  </Box>
                  <Box>
                    <Heading size={"sm"}>Booking</Heading>
                    <Text>Belum tersedia</Text>
                  </Box>
                </Flex>
              </Tab>
              <Tab>
                <Flex
                  height={"40px"}
                  w={"250px"}
                  h={"100px"}
                  gap={5}
                  alignItems={"center"}
                  border="1px solid #ddd"
                  borderRadius={6}
                  justifyContent={"center"}
                  p={5}
                  bg={"#fff"}
                >
                  <Box>
                    <MdOutlinePayment size={35} />
                  </Box>
                  <Box>
                    <Heading size={"sm"}>Pembayaran</Heading>
                    <Text>belum membayar</Text>
                  </Box>
                </Flex>
              </Tab>
              <Tab>
                <Flex
                  height={"40px"}
                  w={"250px"}
                  h={"100px"}
                  gap={5}
                  alignItems={"center"}
                  border="1px solid #ddd"
                  borderRadius={6}
                  justifyContent={"center"}
                  p={5}
                  bg={"#fff"}
                >
                  <Box>
                    <FaListCheck size={35} />
                  </Box>
                  <Box>
                    <Heading size={"sm"}>Jadwal</Heading>
                    <Text>belum tersedia</Text>
                  </Box>
                </Flex>
              </Tab>
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel>
              {" "}
              <UserPacket />
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel>
              <Jadwal />
            </TabPanel>
          </TabPanels>
        </Box>
      </Flex>
    </Tabs>
  );
};

export default UserDashboard;
