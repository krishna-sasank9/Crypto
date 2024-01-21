import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const avatarSrc = "https://instagram.fhyd14-1.fna.fbcdn.net/v/t51.2885-19/359744394_642897654454366_1829014681995879868_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fhyd14-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=UfBh-4XoC9kAX8zJOur&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBummoWKBAmIlnFFoCDeHRo2UMQYcwcYbrfORLwYFboXA&oe=651D5998&_nc_sid=8b3546";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
           Trading App
          </Text>
        </VStack>

        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={avatarSrc} />
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;