import React from "react";
import { Flex, Image, Wrap } from "@chakra-ui/core";
import {
  UDINI_SOCIAL_FACEBOOK,
  UDINI_SOCIAL_INSTAGRAM,
  UDINI_SOCIAL_LINKEDIN,
} from "src/utils/constants/udini";

const SOCIALS_LINKS = [
  {
    href: UDINI_SOCIAL_FACEBOOK,
    img: "/svg/drawer/facebook.svg",
    alt: "facebook",
  },
  {
    href: UDINI_SOCIAL_INSTAGRAM,
    img: "/svg/drawer/instagram.svg",
    alt: "instagram",
  },
  {
    href: UDINI_SOCIAL_LINKEDIN,
    img: "/svg/drawer/linkedin.svg",
    alt: "linkedin",
  },
];

const UdiniSharedHeaderSocialLinkList = () => {
  return (
    <Wrap direction="row" spacing="35px" justify="center">
      {SOCIALS_LINKS.map((socialImg) => (
        <Flex
          key={socialImg.alt}
          as="a"
          href={socialImg.href}
          target="_blank"
          cursor="poiner"
          w="30px"
        >
          <Image src={socialImg.img} alt="facebook" />
        </Flex>
      ))}
    </Wrap>
  );
};

export default UdiniSharedHeaderSocialLinkList;
