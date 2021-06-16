import { useToast } from "@chakra-ui/core";
import { useSentry } from "src/services/Sentry";
import useTranslation from "next-translate/useTranslation";

const useStripeToast = () => {
  const toast = useToast();
  const { log } = useSentry();
  const { t } = useTranslation();

  return {
    sendStripeErrorToast: (stripeErrorCode: string) => {
      let description: string;

      switch (stripeErrorCode) {
        case "invalid_request_error":
          description = t("signup:invalidRequestError");
          break;
        case "Your card was declined.": // TODO: switch to `case "card_declined"` when server sends good errors:
          description = t("signup:cardDeclined");
          break;
        default:
          log(`Unhandled stripe error code : ${stripeErrorCode}`, "error");
          description = stripeErrorCode;
          break;
      }
      toast({
        position: "top",
        title: t("signup:stripeErrorTitle"),
        description,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    sendSuccessToast: () =>
      toast({
        position: "top",
        title: t("signup:stripeSuccessTitle"),
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
  };
};

export default useStripeToast;
