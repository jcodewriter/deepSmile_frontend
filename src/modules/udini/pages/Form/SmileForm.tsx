import { VStack, Button, Box, HStack, Text, Grid } from "@chakra-ui/core";
import { useState } from "react";
import SmileFormFirstLeftView from "./components/Views/SmileFormFirstLeftView";
import CommunityFormSecondLeftView from "./components/Views/CommunityFormSecondLeftView";
import CommunityFormThirdLeftView from "./components/Views/CommunityFormThirdLeftView";
import { useForm } from "react-hook-form";
import SmileFormFirstRightView from "./components/Forms/SmileFormFirstRightView";
import CommunityFormSecondRightView from "./components/Forms/CommunityFormSecondRightView";
import CommunityFormThirdRightView from "./components/Forms/CommunityFormThirdRightView";
import SharedGradientButtonLink, {
  SharedGradientButton,
} from "src/shared/components/Button/SharedGradientButton";
import { UDINI_PRODUCT_SMILE_ROUTE } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";

interface FormData {
  evolution: boolean;
  beta: boolean;
  suggest: boolean;
}

const SmileForm = () => {
  const { t } = useTranslation();
  const [stage, setStage] = useState(0);
  const { handleSubmit, register, control, errors } = useForm({ mode: "onBlur" });

  const goToNextPage = () => {
    if (stage < 2) setStage(stage + 1);
  };

  const goToPreviousPage = () => {
    if (stage > 0) setStage(stage - 1);
  };

  const onSubmit = handleSubmit((values) => {
    const Airtable = require("airtable");
    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(
      "appqSaVpzq79ytmlu"
    );

    base("Smile+").create(
      [
        {
          fields: {
            Message: values.message,
            "Phone number": values.phone,
            Email: values.email,
            "You are": values.work,
            "Smile+ release": values.release,
            "Beta test": values.beta,
            "Smile+ design": values.design,
            "Full name": values.name,
          },
        },
      ],
      //eslint-disable-next-line
      function (err: any, records: any) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    setStage(2);
  });
  return (
    <Grid
      minHeight="100vh"
      bg="brandPink.100"
      gridTemplateColumns={{ base: "1fr", md: "0.7fr 1fr" }}
    >
      <VStack>
        {stage === 0 && <SmileFormFirstLeftView />}
        {stage === 1 && <CommunityFormSecondLeftView />}
        {stage === 2 && <CommunityFormThirdLeftView />}
      </VStack>
      <VStack bg="#F6F9FB" paddingBottom="30px" paddingX={{ base: "20px", md: 0 }}>
        <form onSubmit={onSubmit}>
          <SmileFormFirstRightView control={control} display={stage === 0 ? "normal" : "none"} />
          <CommunityFormSecondRightView
            errors={errors}
            register={register}
            display={stage === 1 ? "normal" : "none"}
          />
          <CommunityFormThirdRightView display={stage === 2 ? "normal" : "none"} />
          {stage === 0 && (
            <Box pt="160px" justify="center" align="center">
              <SharedGradientButton onClick={goToNextPage} variant="form">
                {t("udiniSmile:formFirstStepRightSectionButton")}
              </SharedGradientButton>
            </Box>
          )}
          {stage === 1 && (
            <HStack pt="200px" justify="center" align="center" spacing="40px">
              <Button variant="link" onClick={goToPreviousPage}>
                <Text
                  fontFamily="Montserrat"
                  fontStyle="normal"
                  fontWeight="600"
                  fontSize="16px"
                  lineHeight="20px"
                  color="#222222"
                >
                  {t("udiniSmile:formSecondStepRightSectionBackButton")}
                </Text>
              </Button>
              <SharedGradientButton variant="form" type="submit">
                {t("udiniSmile:formSecondStepRightSectionSubmitButton")}
              </SharedGradientButton>
            </HStack>
          )}
          {stage === 2 && (
            <Box pt="30px" justify="center" align="center">
              <SharedGradientButtonLink href={UDINI_PRODUCT_SMILE_ROUTE} variant="form">
                {t("udiniCommunity:formReturnToUdiniButton")}
              </SharedGradientButtonLink>
            </Box>
          )}
        </form>
      </VStack>
    </Grid>
  );
};

export default SmileForm;
