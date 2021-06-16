import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/utils/tests/renderWithThemeAuthRouter";
import PixProfileModalInformationForm from "../PixProfileModalInformationForm";
import { UPDATE_USER_INFOS } from "src/graphql/Mutations/User";
import { wait } from "next/dist/build/output/log";
import * as AuthContext from "src/shared/contexts/AuthContext";
import { GET_PROFILE } from "src/graphql/Queries/User";

afterAll(() => {
  jest.clearAllMocks();
});

const renderModifyInformationForm = () => {
  const newUserInfos = {
    firstName: "New",
    lastName: "Value",
    phone: "0504030201",
  };
  const mockUpdateUserInfosResult = jest.fn(() => ({
    data: {
      updateUserInfos: {
        infos: {
          firstName: "New",
          lastName: "Value",
          phone: "0504030201",
        },
      },
    },
  }));
  const mocksUpdateUserInfos = [
    {
      request: {
        query: UPDATE_USER_INFOS,
        variables: {
          infos: {
            firstName: "New",
            lastName: "Value",
            phone: "0504030201",
          },
        },
      },
      result: mockUpdateUserInfosResult,
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
    <PixProfileModalInformationForm
      buttonText={"profile:profileModalModifyInfoButton"}
      closeModal={() => {
        return;
      }}
    />,
    mocksUpdateUserInfos,
    {
      push: mockPush,
    }
  );

  return {
    ...utils,
    values: {
      newUserInfos,
    },
    components: {
      firstNameField: utils.getByLabelText(/profile:profileModalInfoFirstNameLabel/i),
      lastNameField: utils.getByLabelText(/profile:profileModalInfoLastNameLabel/i),
      phoneField: utils.getByLabelText(/profile:profileModalInfoPhoneLabel/i),
      submitButton: utils.getByText(/profile:profileModalModifyInfoButton/i).closest("button"),
    },
    mockedFunctions: {
      mockUpdateUserInfosResult,
      mockPush,
    },
  };
};

test("Test that fields are correctly set", async () => {
  //Mock useAuthState to provide mocked profile
  jest.spyOn(AuthContext, "useAuthState").mockImplementation(() => ({
    profile: {
      infos: {
        firstName: "Testing",
        lastName: "Test",
        phone: "0102030405",
      },
    },
  }));

  const { components } = renderModifyInformationForm();

  //Check initial values
  await waitFor(() => expect(components.firstNameField.value).toBe("Testing"));
  expect(components.lastNameField.value).toBe("Test");
  expect(components.phoneField.value).toBe("0102030405");
});

test("Test that fields can be correctly changed", async () => {
  //Mock useAuthState to provide mocked profile
  jest.spyOn(AuthContext, "useAuthState").mockImplementation(() => ({
    profile: {
      infos: {
        firstName: "Testing",
        lastName: "Test",
        phone: "0102030405",
      },
    },
  }));

  const { components, values } = renderModifyInformationForm();

  //Change input values as a user would
  fireEvent.change(components.firstNameField, {
    target: { value: values.newUserInfos.firstName },
  });
  fireEvent.change(components.lastNameField, {
    target: { value: values.newUserInfos.lastName },
  });
  fireEvent.change(components.phoneField, { target: { value: values.newUserInfos.phone } });

  //Check if new values are set
  await waitFor(() => expect(components.firstNameField.value).toBe("New"));
  expect(components.lastNameField.value).toBe("Value");
  expect(components.phoneField.value).toBe("0504030201");
});

test("Test that fields can't be empty", async () => {
  //Mock useAuthState to provide mocked profile
  jest.spyOn(AuthContext, "useAuthState").mockImplementation(() => ({
    profile: {
      infos: {
        firstName: "Testing",
        lastName: "Test",
        phone: "0102030405",
      },
    },
  }));

  const { components, getAllByText } = renderModifyInformationForm();

  //Empty input values
  fireEvent.change(components.firstNameField, { target: { value: "" } });
  fireEvent.change(components.lastNameField, { target: { value: "" } });
  fireEvent.change(components.phoneField, { target: { value: "" } });

  //Click submit (required to make button disabled and error messages appear)
  fireEvent.click(components.submitButton);

  //Check if button is disabled and if error messages are present
  //TODO: Uncomment when GradientButton can be disabled
  /* await waitFor(() => expect(components.submitButton).toBeDisabled()); */
  await waitFor(() => expect(getAllByText(/form:formRequiredField/i)).toHaveLength(3));
});

test("Firing test", async () => {
  //Mock useAuthState to provide mocked profile
  jest.spyOn(AuthContext, "useAuthState").mockImplementation(() => ({
    profile: {
      infos: {
        firstName: "Testing",
        lastName: "Test",
        phone: "0102030405",
      },
    },
  }));

  const { components, values, mockedFunctions } = renderModifyInformationForm();

  //Change input values as a user would
  fireEvent.change(components.firstNameField, {
    target: { value: values.newUserInfos.firstName },
  });
  fireEvent.change(components.lastNameField, {
    target: { value: values.newUserInfos.lastName },
  });
  fireEvent.change(components.phoneField, { target: { value: values.newUserInfos.phone } });

  //Click submit button
  fireEvent.click(components.submitButton);

  //Check if query has been fired
  await waitFor(() => expect(mockedFunctions.mockUpdateUserInfosResult).toHaveBeenCalledTimes(1));
});

test("Basic test checking that component are rendered", () => {
  wait(() => {
    renderModifyInformationForm();
  });
});
