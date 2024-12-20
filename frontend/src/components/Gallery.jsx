import {
    Heading, Image, Wrap, WrapItem, Center
} from "@chakra-ui/react";

const Gallery = () => {
    return (
        <>
            <Heading textAlign={"center"}
                my={20}
                mb={{ base: "2", md: "20" }}
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'>Galery</Heading>
            <Wrap mx={{ base: 2, md: 20 }} spacing='30px' justifyContent={"space-between"}>
                {["/image1.jpg", "/img1.jpg", "/img2.jpg", "/image1.jpg"].map((src, index) => (
                    <WrapItem key={index} mb={{base: "none", md: "10"}} transition="all 0.3s" _hover={{ transform: "scale(1.05)" }}>
                        <Center w={{ base: "full", md: "270px" }} h={{ base: "full", md: "270px" }}>
                            <Image 
                                borderRadius={10} 
                                src={src} 
                                alt="tentang kami"
                                objectFit="cover"
                                w={{ base: "100%", md: "270px" }}
                                h={{ base: "auto", md: "270px" }}
                            />
                        </Center>
                    </WrapItem>
                ))}
            </Wrap>
        </>
    );
}

export default Gallery;
