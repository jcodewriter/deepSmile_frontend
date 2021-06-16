import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/utils/tests/renderWithThemeAuthRouter";
import PixSignupInfosForm from "src/modules/pix/pages/Signup/components/Forms/PixSignupInfosForm";
import { UPDATE_USER_INFOS } from "src/graphql/Mutations/User";
import { GET_PROFILE } from "src/graphql/Queries/User";
// import * as MockRefreshTokenhelper from "src/services/RefreshTokenHelper";

jest.mock("src/services/RefreshTokenHelper");
// jest.mock("react-google-places-autocomplete");

afterAll(() => {
  jest.clearAllMocks();
});

const renderLoginForm = () => {
  const userInfos = {
    phone: "0801909000",
    firstName: "Jean",
    lastName: "Eude",
    gender: "MALE",
    softwareName: "Ortholeader",
    hearAboutUs: "Google search",
    // address: "88 Rue Baron Bouvier", TODO: add google address
    // city: "Vesoul",
    // zipcode: "70000",
    // country: "France",
  };

  const mockUpdateUserInfosResult = jest.fn(() => ({
    data: {
      updateUserInfos: { infos: userInfos },
    },
  }));
  const mocksUpdateUserInfos = [
    {
      request: {
        query: UPDATE_USER_INFOS,
        variables: { infos: userInfos },
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
  const mockSetStep = jest.fn();
  const utils = render(<PixSignupInfosForm setStep={mockSetStep} />, mocksUpdateUserInfos, {});

  return {
    ...utils,
    values: {
      userInfos,
      address: "88 Rue Baron Bouvier, 70000 Vesoul, France",
    },
    components: {
      firstNameField: utils.getByLabelText(/pixSignup:firstNameLabel/i),
      lastNameField: utils.getByLabelText(/pixSignup:lastNameLabel/i),
      maleFieldR: utils.getByText(/pixSignup:genderMaleOption/i), // 'R' stands for 'radio' because fireEvent needs params when dealing with checkboxes
      phoneField: utils.getByLabelText(/pixSignup:phoneLabel/i),
      // addressField: utils.getByLabelText(/pixSignup:addressLabel/i),
      software1FieldR: utils.getByText(/pixSignup:softwareFirstOption/i),
      source2FieldR: utils.getByText(/pixSignup:sourceGoogleOption/i),
      submitButton: utils.getByText(/pixSignup:goButton/i),
    },
    mockedFunctions: {
      mockUpdateUserInfosResult,
      mockSetStep,
    },
  };
};

describe("PixSignupInfosForm", () => {
  it("should display 'form:formRequiredField' in required fields", async () => {
    const { components, getAllByText, mockedFunctions } = renderLoginForm();

    // Submit SignUp
    fireEvent.click(components.submitButton);

    await waitFor(() => expect(getAllByText(/form:formRequiredField/i)).toHaveLength(3));
    expect(mockedFunctions.mockSetStep).not.toBeCalled();
  });

  it("should display 'form:formRequiredField' when gender input field is empty after form submission", async () => {
    const { components, getByText, mockedFunctions, values } = renderLoginForm();

    components.firstNameField.value = values.userInfos.firstName;
    components.lastNameField.value = values.userInfos.lastName;
    // fireEvent.click(components.maleFieldR);
    components.phoneField.value = values.userInfos.phone;
    // components.addressField.value = values.address;
    fireEvent.click(components.software1FieldR);
    fireEvent.click(components.source2FieldR);

    // Submit SignUp
    fireEvent.click(components.submitButton);

    await waitFor(() => expect(getByText(/form:formRequiredField/i)).toBeInTheDocument());
    expect(mockedFunctions.mockSetStep).not.toBeCalled();
  });

  it("should update a user and redirect to subscription step", async () => {
    const { components, mockedFunctions, values } = renderLoginForm();

    components.firstNameField.value = values.userInfos.firstName;
    components.lastNameField.value = values.userInfos.lastName;
    // components.addressField = values.address;
    fireEvent.click(components.maleFieldR);
    components.phoneField.value = values.userInfos.phone;

    fireEvent.click(components.software1FieldR);
    fireEvent.click(components.source2FieldR);

    // Submit SignUp
    fireEvent.click(components.submitButton);

    // Wait for update query to resolve
    await waitFor(() => expect(mockedFunctions.mockUpdateUserInfosResult).toHaveBeenCalledTimes(1));

    expect(mockedFunctions.mockSetStep).toHaveBeenCalledTimes(1);
    expect(mockedFunctions.mockSetStep).toHaveBeenCalledWith(2);
  });
});

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});
