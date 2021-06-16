import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/utils/tests/renderWithThemeAuthRouter";
import PixSignupCreateForm from "src/modules/pix/pages/Signup/components/Forms/PixSignupCreateForm";
import { SIGN_UP } from "src/graphql/Mutations/Auth";
import { GET_PROFILE } from "src/graphql/Queries/User";
import * as MockRefreshTokenhelper from "src/services/RefreshTokenHelper";

import { GraphQLError } from "graphql";

jest.mock("src/services/RefreshTokenHelper");

afterAll(() => {
  jest.clearAllMocks();
});

const renderLoginForm = (options = { shouldRequestFail: false, password: "password" }) => {
  const credentials = ["test@test.com", options.password];
  const tokens = ["refresh123", "auth123"];
  const graphqlErrors = ["Email does not exist", "Incorrect password"];
  const mockSignUpResult = jest.fn(() => ({
    data: {
      signUpOrLogin: {
        refreshToken: tokens[0],
        authToken: tokens[1],
        user: {},
      },
    },
    errors: options.shouldRequestFail
      ? graphqlErrors.map((err) => new GraphQLError(err))
      : undefined,
  }));
  const mockQueryUser = jest.fn(() => ({
    data: {
      me: {},
    },
  }));
  const mocksSignUp = [
    {
      request: {
        query: SIGN_UP,
        variables: {
          email: credentials[0],
          password: credentials[1],
        },
      },
      result: mockSignUpResult,
    },
    {
      request: {
        query: GET_PROFILE,
      },
      result: mockQueryUser,
    },
  ];

  const mockSetStep = jest.fn();

  const utils = render(<PixSignupCreateForm setStep={mockSetStep} />, mocksSignUp, {});

  return {
    ...utils,
    values: {
      credentials,
      tokens,
      graphqlErrors,
    },
    components: {
      submitButton: utils.getByText(/pixSignup:goButton/i),
      emailField: utils.getByLabelText(/pixSignup:emailLabel/i),
      passwordField: utils.getByLabelText(/pixSignup:passwordLabel/i), // First field is password
      confirmPasswordField: utils.getByLabelText(/pixSignup:confirmPasswordLabel/i), // Should exist
    },
    mockedFunctions: {
      mockSignUpResult,
      mockQueryUser,
      mockSetStep,
    },
  };
};

describe("PixSignupCreateForm", () => {
  it("Test that fields can't be empty", async () => {
    const { components, getAllByText, mockedFunctions } = renderLoginForm();
    // Submit SignUp
    fireEvent.click(components.submitButton);

    await waitFor(() => expect(getAllByText(/form:formRequiredField/i)).toHaveLength(3));
    expect(mockedFunctions.mockSetStep).toHaveBeenCalledTimes(0);
  });

  test("The password has less than 7 characters", async () => {
    const { values, components, getByText, mockedFunctions } = renderLoginForm();

    // We still need to send a 'valid' email, else the request wont be mocked
    components.emailField.value = values.credentials[0];
    components.passwordField.value = "false";
    components.confirmPasswordField.value = "false";

    // Submit SignUp
    fireEvent.click(components.submitButton);

    await waitFor(() => expect(getByText(/form:formPasswordLength/i)).toBeInTheDocument());
    expect(mockedFunctions.mockSetStep).toHaveBeenCalledTimes(0);
  });

  test("Confirmation password does not match", async () => {
    const { values, components, getByText, mockedFunctions } = renderLoginForm();

    // We still need to send a 'valid' email, else the request wont be mocked
    components.emailField.value = values.credentials[0];
    components.passwordField.value = "1234567";
    components.confirmPasswordField.value = "abcdefg";

    // Submit SignUp
    fireEvent.click(components.submitButton);

    await waitFor(() => expect(getByText(/form:formPasswordMismatch/i)).toBeInTheDocument());
    expect(mockedFunctions.mockSetStep).toHaveBeenCalledTimes(0);
  });

  // test("Unknown email should throw an error", async () => {
  //   const { mockedFunctions, values, components, getByText } = renderLoginForm({
  //     shouldRequestFail: true,
  //   });

  //   // We still need to send a 'valid' email, else the request wont be mocked
  //   components.emailField.value = values.credentials[0];
  //   components.passwordField.value = values.credentials[1];
  //   components.confirmPasswordField.value = values.credentials[1];

  //   // Submit SignUp
  //   fireEvent.click(components.submitButton);

  //   // Wait for SignUp query to resolve
  //   await waitFor(() => expect(mockedFunctions.mockSignUpResult).toHaveBeenCalledTimes(1));
  //   expect(getByText(values.graphqlErrors[0])).toBeInTheDocument();

  //   expect(mockedFunctions.mockSetStep).toHaveBeenCalledTimes(0);
  // });

  test("Sign in a user with the wrond password", async () => {
    const wrongPassword = "1234567";
    const { mockedFunctions, values, components, getByText } = renderLoginForm({
      shouldRequestFail: true,
      password: wrongPassword,
    });

    components.emailField.value = values.credentials[0];
    components.passwordField.value = wrongPassword;
    components.confirmPasswordField.value = wrongPassword;

    // Submit SignUp
    fireEvent.click(components.submitButton);

    // Wait for SignUp query to resolve
    await waitFor(() => expect(mockedFunctions.mockSignUpResult).toHaveBeenCalledTimes(1));
    expect(getByText(values.graphqlErrors[1])).toBeInTheDocument();

    expect(mockedFunctions.mockSetStep).toHaveBeenCalledTimes(0);
  });

  test("Sign up a user and redirect to user infos step", async () => {
    const { mockedFunctions, values, components } = renderLoginForm();

    components.emailField.value = values.credentials[0];
    components.passwordField.value = values.credentials[1];
    components.confirmPasswordField.value = values.credentials[1];

    // Submit SignUp
    fireEvent.click(components.submitButton);

    // Wait for SignUp query to resolve
    await waitFor(() => expect(mockedFunctions.mockSignUpResult).toHaveBeenCalledTimes(1));

    // Wait for SignUp's onCompleted callbacks to resolve
    await waitFor(() =>
      expect(MockRefreshTokenhelper.setTokensAndTimeout).toHaveBeenCalledTimes(1)
    );
    expect(MockRefreshTokenhelper.setTokensAndTimeout).toHaveBeenCalledWith(
      ...values.tokens,
      expect.any(Function)
    );
    expect(mockedFunctions.mockSetStep).toHaveBeenCalledTimes(1);
    expect(mockedFunctions.mockSetStep).toHaveBeenCalledWith(1);
  });
});
