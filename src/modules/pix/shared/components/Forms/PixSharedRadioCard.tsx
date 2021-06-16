import React from "react";
import { Radio, Flex } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { Plan } from "src/shared/types/User";
import { CardText, Text } from "src/shared/components/Text/Text";

export interface PixSharedRadioCardProps {
  plan?: Plan;
  gradient: string[];
  priceFormatter: Intl.NumberFormat | undefined;
  isChecked?: boolean;
}

const PixSharedRadioCard = ({
  plan,
  priceFormatter,
  gradient,
  isChecked,
}: PixSharedRadioCardProps) => {
  const { register } = useFormContext();
  const { t } = useTranslation();

  if (!plan) {
    return null;
  }

  return (
    <Flex
      direction="row"
      justify="space-between"
      borderRadius="5px"
      background={`linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`}
      padding="24px"
      minW="600px"
    >
      <Radio
        colorScheme="white"
        value={plan.plan}
        w="100%"
        name="plan"
        ref={register}
        isChecked={isChecked}
      >
        <Flex marginX="51px" direction="column">
          <CardText color="white">{t(`pixSignup:plan${plan.plan}OptionTitle`)}</CardText>
          <Text color="white">
            {t(`pixSignup:plan${plan.plan}OptionText`, { count: plan.numberOfPhotosInPlan })}
          </Text>
        </Flex>
      </Radio>
      <CardText textAlign="right" color="white">
        {t(`pixSignup:plan${plan.plan}OptionPrice`, {
          price: priceFormatter?.format(plan.price) ?? plan.price,
        })}
      </CardText>
    </Flex>
  );
};

export default PixSharedRadioCard;
