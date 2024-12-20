
import {
  Box,
  Heading,
  Text,
  Flex,
  Center,
  Avatar,
} from "@chakra-ui/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO",
      text: "I am very impressed with the quality of service provided by this company. They exceeded my expectations!",
      imageUrl: "url_to_image1.jpg",
    },
    {
      name: "Jane Smith",
      position: "Designer",
      text: "The team's creativity and attention to detail are unmatched. I would highly recommend them.",
      imageUrl: "url_to_image2.jpg",
    },
    {
      name: "Alice Johnson",
      position: "Developer",
      text: "I've been working with this company for years, and their consistency is remarkable. I trust them with all my projects.",
      imageUrl: "url_to_image3.jpg",
    },
    {
        name: "Alice Johnson",
        position: "Developer",
        text: "I've been working with this company for years, and their consistency is remarkable. I trust them with all my projects.",
        imageUrl: "url_to_image3.jpg",
      },
      {
        name: "Alice Johnson",
        position: "Developer",
        text: "I've been working with this company for years, and their consistency is remarkable. I trust them with all my projects.",
        imageUrl: "url_to_image3.jpg",
      },
      {
        name: "Alice Johnson",
        position: "Developer",
        text: "I've been working with this company for years, and their consistency is remarkable. I trust them with all my projects.",
        imageUrl: "url_to_image3.jpg",
      },
  ];


  return (
    <Box py={{ base: "8", md: "16" }} bg="dark.100" >
      <Center>
        <Heading as="h2" size={{ base: "2xl", md: "xl" }} mb="8">
          Testimonials
        </Heading>
      </Center>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        wrap="wrap"
      >
        {testimonials.map((testimonial, index) => (
          <Box
            key={index}
            p="4"
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            shadow='md' 
            m="4"
            mb={{ base: "8", md: "0" }}
            textAlign="center"
            bg={"#fff"}
          >
            <Avatar src={testimonial.imageUrl} size="lg" name={testimonial.name} />
            <Text mt="4" fontSize="lg">
              {testimonial.text}
            </Text>
            <Text mt="2" fontWeight="bold">
              {testimonial.name}
            </Text>
            <Text color="gray.500">{testimonial.position}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Testimonial;
