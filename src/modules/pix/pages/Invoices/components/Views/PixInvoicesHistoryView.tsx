import React from "react";
import { Text, HStack, VStack, IconButton, Flex } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";
import { Invoice } from "src/shared/types/User";
import { ViewIcon } from "@chakra-ui/icons";
import { formatDate } from "src/utils/helpers/DateHelper";

//TODO: Add invoice number to backend
//TODO: Add colorScheme black when not hovered to IconButton

interface GetTitlesProps {
  t: (key: string, query?: { [name: string]: React.ReactText } | undefined) => string;
}

const getAmount = (invoice: Invoice) => {
  if (invoice.amount !== null && invoice.amount !== undefined) {
    return invoice.currency === "eur"
      ? invoice.amount.toString().concat("\u20ac")
      : "$".concat(invoice.amount.toString());
  }
  return "";
};

const getTitles = ({ t }: GetTitlesProps) => [
  t("pixInvoices:invoicesBillNumber"),
  t("pixInvoices:invoicesIssuedAt"),
  t("pixInvoices:invoicesAmount"),
];

const PixInvoicesHistoryView = () => {
  const { t, lang } = useTranslation();
  const { profile } = useAuthState();
  const titles = getTitles({ t });

  return (
    <VStack>
      <HStack
        w="100%"
        px="55px"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
      >
        <HStack w="50%" justify="flex-start">
          <Text>{titles[0]}</Text>
          <Text position="absolute" paddingLeft="253px">
            {titles[1]}
          </Text>
        </HStack>
        <HStack w="50%" justify="flex-end">
          <Text paddingRight="88px">{titles[2]}</Text>
        </HStack>
      </HStack>
      <VStack w="100%">
        {profile?.planInfos?.invoices?.map((invoice) => (
          <Flex
            w="100%"
            h="70px"
            key={invoice.date}
            borderRadius="60px"
            _hover={{
              bg: "brandBlue.100",
              color: "white",
            }}
            paddingLeft="55px"
            paddingRight="38px"
            my="26px"
            bg="white"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            color="#212B36"
            fontFamily="Montserrat"
            fontSize="14px"
            fontWeight="bold"
            fontStyle="normal"
            lineHeight="20px"
          >
            <HStack w="50%" justify="flex-start">
              <Text>{t("pixInvoices:invoicesBillNumber")}</Text>
              <Text position="absolute" paddingLeft="253px">
                {formatDate(lang, invoice.date)}
              </Text>
            </HStack>
            <HStack w="50%" justify="flex-end">
              <Text position="absolute" paddingRight="88px">
                {getAmount(invoice)}
              </Text>
              <IconButton
                as="a"
                href={invoice.url}
                icon={<ViewIcon />}
                aria-label="viewButton"
                bg="transparent"
                _hover={{ bg: "transparent" }}
              />
            </HStack>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
};

{
  /*            <HStack w="100%" justify="flex-start">
              <Text>Invoice number</Text>
              <Text position="absolute" paddingLeft="20%">
                {getDate(lang, invoice)}
              </Text>
              <Text paddingLeft="77%">
                {getAmount(invoice)}
              </Text>
            </HStack>
            <HStack>
              <IconButton
                as="a"
                href={invoice.url}
                icon={<ViewIcon />}
                aria-label="viewButton"
                colorScheme="white"
              />
            </HStack> */
}

export default PixInvoicesHistoryView;
