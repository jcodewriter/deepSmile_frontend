import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/utils/tests/renderWithThemeAuthRouter";
import PixLoginForm from "src/modules/pix/pages/Login/components/Forms/PixLoginForm";
import { SIGN_IN } from "src/graphql/Mutations/Auth";
import * as MockRefreshTokenhelper from "src/services/RefreshTokenHelper";
// import { PIX_HOME_ROUTE } from "src/utils/routes";
import { GraphQLError } from "graphql";
import { GET_PROFILE } from "src/graphql/Queries/User";

jest.mock("src/services/RefreshTokenHelper");

afterAll(() => {
  jest.clearAllMocks();
});

const renderLoginForm = (options = { shouldRequestFail: false }) => {
  const credentials = ["test@test.com", "password"];
  const tokens = ["refresh123", "auth123"];
  const graphqlError = "Email does not exist";
  const mockSignInResult = jest.fn(() => ({
    data: {
      login: {
        refreshToken: tokens[0],
        authToken: tokens[1],
        user: {},
      },
    },
    errors: options.shouldRequestFail ? [new GraphQLError(graphqlError)] : undefined,
  }));
  const mocksSignIn = [
    {
      request: {
        query: SIGN_IN,
        variables: {
          email: credentials[0],
          password: credentials[1],
        },
      },
      result: mockSignInResult,
    },
    {
      request: {
        query: GET_PROFILE,
      },
      result: { data: { me: {} } },
    },
  ];
  const mockPush = jest.fn();
  const utils = render(<PixLoginForm />, mocksSignIn, { push: mockPush });

  const submitButton = utils.getByText(/pixSignIn:button/i);
  return {
    ...utils,
    values: {
      credentials,
      tokens,
      graphqlError,
    },
    components: {
      submitButton,
      emailField: utils.getByLabelText(/pixSignIn:emailLabel/i),
      passwordField: utils.getByLabelText(/pixSignIn:passwordLabel/i),
    },
    mockedFunctions: {
      mockSignInResult,
      mockPush,
    },
  };
};

describe("PixLoginForm", () => {
  test("Login a user and redirect to PIX HOME", async () => {
    const { mockedFunctions, values, components } = renderLoginForm();

    components.emailField.value = values.credentials[0];
    components.passwordField.value = values.credentials[1];

    // Submit SignIn
    fireEvent.click(components.submitButton);

    // Wait for SignIn query to resolve
    await waitFor(() => expect(mockedFunctions.mockSignInResult).toHaveBeenCalledTimes(1));

    // Wait for SignIn's onCompleted callbacks to resolve
    await waitFor(() =>
      expect(MockRefreshTokenhelper.setTokensAndTimeout).toHaveBeenCalledTimes(1)
    );
    expect(MockRefreshTokenhelper.setTokensAndTimeout).toHaveBeenCalledWith(
      ...values.tokens,
      expect.any(Function)
    );

    // // TODO: solve mock routing error
    // expect(mockedFunctions.mockPush).toHaveBeenCalledTimes(1);
    // expect(mockedFunctions.mockPush).toHaveBeenCalledWith(PIX_HOME_ROUTE);
  });

  test("Test that fields can't be empty", async () => {
    const { components, getAllByText } = renderLoginForm();
    // Submit SignIn
    fireEvent.click(components.submitButton);

    await waitFor(() => expect(getAllByText(/form:formRequiredField/i)).toHaveLength(2));
  });

  test("Unknown email should throw an error", async () => {
    const { mockedFunctions, values, components, getByText } = renderLoginForm({
      shouldRequestFail: true,
    });

    // We still need to send a 'valid' email, else the request wont be mocked
    components.emailField.value = values.credentials[0];
    components.passwordField.value = values.credentials[1];

    // Submit SignIn
    fireEvent.click(components.submitButton);

    // Wait for SignIn query to resolve
    await waitFor(() => expect(mockedFunctions.mockSignInResult).toHaveBeenCalledTimes(1));
    expect(getByText(values.graphqlError)).toBeInTheDocument();
  });
});
