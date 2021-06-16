import React from "react";
import { Flex } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { Plan } from "src/shared/types/User";
import { CardText, Text } from "src/shared/components/Text/Text";

export interface SubscriptionPlanControlProps {
  plan?: Plan;
  gradient: string[];
  priceFormatter: Intl.NumberFormat | undefined;
  isButton?: boolean;
}

const SubscriptionPlanView = ({ plan, priceFormatter, gradient }: SubscriptionPlanControlProps) => {
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
      <Flex direction="column">
        <CardText textAlign="left" color="white">
          {t(`pixSignup:plan${plan.plan}OptionTitle`)}
        </CardText>
        <Text color="white">
          {t(`pixSignup:plan${plan.plan}OptionText`, { count: plan.numberOfPhotosInPlan })}
        </Text>
      </Flex>
      <CardText textAlign="right" color="white">
        {t(`pixSignup:plan${plan.plan}OptionPrice`, {
          price: priceFormatter?.format(plan.price) ?? plan.price,
        })}
      </CardText>
    </Flex>
  );
};

export default SubscriptionPlanView;
