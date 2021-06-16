import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/utils/tests/renderWithThemeAuthRouter";
import PixProfileModalPasswordForm from "../PixProfileModalPasswordForm";
import { UPDATE_PASSWORD } from "src/graphql/Mutations/User";
import { GET_PROFILE } from "src/graphql/Queries/User";

afterAll(() => {
  jest.clearAllMocks();
});

const renderModifyPasswordForm = () => {
  const newPasswordObject = {
    newPassword: "testtest",
    confirmPassword: "testtest",
  };
  const mockUpdatePasswordResult = jest.fn(() => ({
    data: {
      updatePassword: true,
    },
  }));
  const mocksUpdatePassword = [
    {
      request: {
        query: UPDATE_PASSWORD,
        variables: {
          newPassword: "testtest",
        },
      },
      result: mockUpdatePasswordResult,
    },
    {
      request: {
        query: GET_PROFILE,
      },
      result: { data: { me: {} } },
    },
  ];
  const mockPush = jest.fn();
  const utils = render(
    <PixProfileModalPasswordForm
      buttonText={"profile:profileModalModifyPasswordButton"}
      closeModal={() => {
        return;
      }}
    />,
    mocksUpdatePassword,
    {
      push: mockPush,
    }
  );

  return {
    ...utils,
    values: {
      newPasswordObject,
    },
    components: {
      newPasswordField: utils.getByLabelText(/profile:profileModalPasswordNewLabel/i),
      confirmPasswordField: utils.getByLabelText(/profile:profileModalPasswordConfirmLabel/i),
      submitButton: utils.getByText(/profile:profileModalModifyPasswordButton/i).closest("button"),
    },
    mockedFunctions: {
      mockUpdatePasswordResult,
      mockPush,
    },
  };
};

test("Test that fields can be correctly changed", async () => {
  const { components, values } = renderModifyPasswordForm();

  //Changing values as a user would
  fireEvent.change(components.newPasswordField, {
    target: { value: values.newPasswordObject.newPassword },
  });
  fireEvent.change(components.confirmPasswordField, {
    target: { value: values.newPasswordObject.confirmPassword },
  });

  //Checking if values are set
  await waitFor(() => expect(components.newPasswordField.value).toBe("testtest"));
  expect(components.confirmPasswordField.value).toBe("testtest");
});

test("Test that fields can't be empty", async () => {
  const { components, getAllByText } = renderModifyPasswordForm();

  //Click submit button (values empty)
  fireEvent.click(components.submitButton);

  //Check if submit button is disabled and error messages present
  //TODO: Uncomment when GradientButton can be disabled
  /* await waitFor(() => expect(components.submitButton).toBeDisabled()); */
  await waitFor(() => expect(getAllByText(/form:formRequiredField/i)).toHaveLength(2));
});

test("Test that password need to match", async () => {
  const { components, getByText } = renderModifyPasswordForm();

  //Change input values as a user would
  fireEvent.change(components.newPasswordField, {
    target: { value: "matching" },
  });
  fireEvent.change(components.confirmPasswordField, {
    target: { value: "notMatching" },
  });

  //Click submit button
  fireEvent.click(components.submitButton);

  //Check if submit button is disabled and error messages present
  //TODO: Uncomment when GradientButton can be disabled
  /* await waitFor(() => expect(components.submitButton).toBeDisabled()); */
  await waitFor(() => expect(getByText(/form:formPasswordMismatch/i)).toBeInTheDocument());
});

test("Firing test", async () => {
  const { components, values, mockedFunctions } = renderModifyPasswordForm();

  //Change input values as a user would
  fireEvent.change(components.newPasswordField, {
    target: { value: values.newPasswordObject.newPassword },
  });
  fireEvent.change(components.confirmPasswordField, {
    target: { value: values.newPasswordObject.confirmPassword },
  });

  //Click submit button
  fireEvent.click(components.submitButton);

  //Check if query has been called
  await waitFor(() => expect(mockedFunctions.mockUpdatePasswordResult).toHaveBeenCalledTimes(1));
});
