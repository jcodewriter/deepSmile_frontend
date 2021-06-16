import React from "react";
import { Grid } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import UdiniSharedFooterLinkItemView from "./UdiniSharedFooterLinkItemView";
import {
  UDINI_CONTACT_ROUTE,
  UDINI_TERMS_AND_CONDITIONS_ROUTE,
  UDINI_TERMS_OF_USE_ROUTE,
  UDINI_FAQ_ROUTE,
  UDINI_PRODUCTS_ROUTE,
  UDINI_HOME_ROUTE,
} from "src/utils/constants/routes";
import {
  UDINI_SOCIAL_FACEBOOK,
  UDINI_SOCIAL_INSTAGRAM,
  UDINI_SOCIAL_LINKEDIN,
} from "src/utils/constants/udini";

const UdiniSharedFooterLinkListView = () => {
  const { t } = useTranslation();
  const data = [
    {
      title: t("udiniFooter:exploreListTitle"),
      links: [
        { text: t("udiniHeader:aboutLink"), href: UDINI_HOME_ROUTE },
        { text: t("udiniHeader:productsText"), href: UDINI_PRODUCTS_ROUTE },
      ],
    },
    {
      title: t("udiniFooter:businessListTitle"),
      links: [{ text: t("udiniFooter:writeUs"), href: UDINI_CONTACT_ROUTE }],
    },
    {
      title: t("udiniFooter:followListTitle"),
      links: [
        {
          text: "Instagram",
          href: UDINI_SOCIAL_INSTAGRAM,
          isExternal: true,
        },
        { text: "Facebook", href: UDINI_SOCIAL_FACEBOOK, isExternal: true },
        { text: "LinkedIn", href: UDINI_SOCIAL_LINKEDIN, isExternal: true },
      ],
    },
    {
      title: t("udiniFooter:legalListTitle"),
      links: [
        { text: t("udiniFooter:legalListTerms"), href: UDINI_TERMS_AND_CONDITIONS_ROUTE },
        { text: t("udiniFooter:legalListPrivacy"), href: UDINI_TERMS_OF_USE_ROUTE },
        { text: "FAQ", href: UDINI_FAQ_ROUTE },
      ],
    },
  ];

  return (
    <Grid
      flexGrow={{ base: 0, sm: 1 }}
      rowGap={{ base: "25px", sm: "20px" }}
      gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
    >
      {data.map((col) => (
        <UdiniSharedFooterLinkItemView key={col.title} title={col.title} links={col.links} />
      ))}
    </Grid>
  );
};

export default UdiniSharedFooterLinkListView;
