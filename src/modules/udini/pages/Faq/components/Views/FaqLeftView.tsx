import React, { Dispatch, FC, SetStateAction } from "react";
import { OrderedList, ListItem, Button } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";

interface FaqLeftViewProps {
  categories: {
    label: string;
    component: FC;
  }[];
  active: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const FaqLeftView = ({ categories, active, onChange }: FaqLeftViewProps) => {
  const { t } = useTranslation();

  return (
    <OrderedList
      spacing="21px"
      paddingTop="120px"
      paddingLeft={{ base: "15px", sm: "50px", md: "80px" }}
      paddingBottom="20px"
      bg="white"
    >
      {categories.map((category) => (
        <ListItem
          opacity={active === category.label ? 1 : 0.5}
          fontWeight="bold"
          fontSize={{ base: "16px", sm: "30px" }}
          lineHeight="123%"
          key={category.label}
        >
          <Button
            opacity={active === category.label ? 1 : 0.5}
            fontWeight="bold"
            fontSize={{ base: "16px", sm: "30px" }}
            lineHeight="123%"
            bg="transparent"
            onClick={() => onChange(category.label)}
          >
            {t(`udiniFaq:${category.label}`)}
          </Button>
        </ListItem>
      ))}
    </OrderedList>
  );
};

export default FaqLeftView;
