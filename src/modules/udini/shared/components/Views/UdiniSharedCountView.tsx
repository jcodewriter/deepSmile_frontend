import React, { useEffect, useState } from "react";
import { Flex, SimpleGrid } from "@chakra-ui/core";
import {
  BigNumberFull,
  BigNumberBorder,
  Subtitle,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

export const UDINI_SHARED_COUNT_VIEW_STAT_LIST = [
  {
    stat: "countSectionNumber1",
    label: "descriptionSectionCustomersStat",
  },
  {
    stat: "countSectionNumber2",
    label: "descriptionSectionPatentsStat",
  },
  {
    stat: "countSectionNumber3",
    label: "descriptionSectionCountriesStat",
  },
];

const UdiniSharedCountView = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const next = (currentNumber + 1) % 3;
    const id = setTimeout(() => setCurrentNumber(next), 2000);
    return () => clearTimeout(id);
  }, [currentNumber]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      rowGap={{ base: "75px", md: 0 }}
      justifyContent="space-between"
      w="100%"
      mt="30px"
      mb="70px"
    >
      {UDINI_SHARED_COUNT_VIEW_STAT_LIST.map((numberStat, index) => (
        <Flex key={numberStat.stat} direction="column" align="center" textAlign="center">
          {currentNumber === index ? (
            <BigNumberFull>{t(`udiniHome:${numberStat.stat}`)}</BigNumberFull>
          ) : (
            <BigNumberBorder>{t(`udiniHome:${numberStat.stat}`)}</BigNumberBorder>
          )}
          <Subtitle color="#FFFFFF">{t(`udiniHome:${numberStat.label}`)}</Subtitle>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default UdiniSharedCountView;
