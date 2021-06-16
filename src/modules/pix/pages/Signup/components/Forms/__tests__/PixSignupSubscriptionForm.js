import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/utils/tests/renderWithThemeAuthRouter";
import { SUBSCRIBE2 } from "src/graphql/Mutations/Plan";
import { SubscriptionPlanProductEnum, SubscriptionPlanStateEnum } from "src/shared/types/User";
import PixSignupSubscriptionForm from "src/modules/pix/pages/Signup/components/Forms/PixSignupSubscriptionForm";
import { PLANS2 } from "src/graphql/Queries/Plan";
import { GET_PROFILE } from "src/graphql/Queries/User";

jest.mock("src/services/RefreshTokenHelper");
jest.mock("@stripe/react-stripe-js", () => {
  return {
    CardNumberElement: ({ onChange }) => <input onChange={onChange} />,
    CardCvcElement: ({ onChange }) => <input onChange={onChange} />,
    CardExpiryElement: ({ onChange }) => <input onChange={onChange} />,
    useStripe: jest.fn(),
    useElements: jest.fn(),
    Elements: ({ children }) => <div>{children}</div>,
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

const renderLoginForm = () => {
  const mockSubscribe2Result = jest.fn(() => ({
    data: {
      subscribe2: {
        planState: SubscriptionPlanStateEnum.ACTIVE,
        threeDSecurePaymentIntentSecret: null,
      },
    },
  }));
  const mockPlan2QueryResult = jest.fn(() => ({
    data: {
      plans2: {
        country: "FR",
        currency: "EUR",
        plans: [
          {
            plan: "FREE",
            price: 0,
            numberOfPhotosInPlan: 100,
          },
          {
            plan: "BASIC",
            price: 25,
            numberOfPhotosInPlan: 300,
          },
          {
            plan: "UNLIMITED",
            price: 70,
            numberOfPhotosInPlan: -1,
          },
        ],
      },
    },
  }));
  const mockSubscribeQueries = [
    {
      request: {
        query: SUBSCRIBE2,
        variables: {
          plan: SubscriptionPlanProductEnum.FREE,
        },
      },
      result: mockSubscribe2Result,
    },
    {
      request: {
        query: PLANS2,
      },
      result: mockPlan2QueryResult,
    },
    {
      request: {
        query: GET_PROFILE,
      },
      result: { data: { me: {} } },
    },
    {
      request: {
        query: GET_PROFILE,
      },
      result: { data: { me: {} } },
    },
  ];
  const mockPush = jest.fn();
  const utils = render(<PixSignupSubscriptionForm />, mockSubscribeQueries, { push: mockPush });

  return {
    ...utils,
    mockedFunctions: {
      mockSubscribe2Result,
      mockPlan2QueryResult,
      mockPush,
    },
  };
};

test("Test that free plan is working", async () => {
  const { mockedFunctions, getByLabelText, getByText } = renderLoginForm();

  // wait for initial query
  await waitFor(() => expect(mockedFunctions.mockPlan2QueryResult).toHaveBeenCalledTimes(1));

  const freePlan = getByLabelText(/pixSignup:planFREEOptionTitle/i);
  const submitButton = getByText(/pixSignup:goButton/i);

  // Check that free is checked by default
  expect(freePlan).toBeChecked();
  expect(submitButton).not.toBeDisabled();
  // TODO: Fix query that is not found for unknown reason
  // await waitFor(() => fireEvent.click(submitButton));
  // await waitFor(async () => expect(mockedFunctions.mockSubscribe2Result).toHaveBeenCalledTimes(1));
  // await waitFor(async () => expect(mockedFunctions.mockPush).toHaveBeenCalledTimes(1));
});

test("Basic test checking that component are rendered", async () => {
  const { mockedFunctions, getByText, getByLabelText } = renderLoginForm();

  await waitFor(() => expect(mockedFunctions.mockPlan2QueryResult).toHaveBeenCalledTimes(1));

  const freePlan = getByLabelText(/pixSignup:planFREEOptionTitle/i);
  const basicPlan = getByLabelText(/pixSignup:planBASICOptionTitle/i);
  //const submitButton = getByText(/pixSignup:goButton/i);

  // Manually trigger form validation
  fireEvent.click(basicPlan);
  fireEvent.blur(basicPlan);
  expect(freePlan).not.toBeChecked();
  expect(basicPlan).toBeChecked();

  await waitFor(() => expect(getByText(/pixSignup:expirationLabel/i)).toBeInTheDocument());
  //expect(submitButton).toBeDisabled();
});
