import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "src/utils/tests/renderWithThemeAuthRouter";
import PixProfileModalAddressModifyForm from "../PixProfileModalAddressModifyForm";
import { UPDATE_USER_INFOS } from "src/graphql/Mutations/User";
import * as AuthContext from "src/shared/contexts/AuthContext";
import { GET_PROFILE } from "src/graphql/Queries/User";

afterAll(() => {
  jest.clearAllMocks();
});

const renderModifyAddressForm = () => {
  const newUserInfos = {
    address: "12 rue des plantes",
    zipcode: "75000",
    city: "Paris",
    country: "France",
  };
  const mockUpdateUserInfosResult = jest.fn(() => ({
    data: {
      updateUserInfos: {
        infos: {
          address: "12 rue des plantes",
          zipcode: "75000",
          city: "Paris",
          country: "France",
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
            address: "12 rue des plantes",
            zipcode: "75000",
            city: "Paris",
            country: "France",
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
    <PixProfileModalAddressModifyForm
      buttonText={"profile:profileModalModifyAddressButton"}
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
      addressField: utils.getByLabelText(/profile:profileModalAddressStreetLabel/i),
      zipcodeField: utils.getByLabelText(/profile:profileModalAddressZipcodeLabel/i),
      cityField: utils.getByLabelText(/profile:profileModalAddressCityLabel/i),
      countryField: utils.getByLabelText(/profile:profileModalAddressCountryLabel/i),
      submitButton: utils.getByText(/profile:profileModalModifyAddressButton/i).closest("button"),
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
        address: "88 Rue Baron Bouvier",
        zipcode: "77000",
        city: "Vesoul",
        country: "France",
      },
    },
  }));

  const { components } = renderModifyAddressForm();

  //Check if initial values are set
  await waitFor(() => expect(components.addressField.value).toBe("88 Rue Baron Bouvier"));
  expect(components.zipcodeField.value).toBe("77000");
  expect(components.cityField.value).toBe("Vesoul");
  expect(components.countryField.value).toBe("France");
});

test("Test that fields can be correctly changed", async () => {
  //Mock useAuthState to provide mocked profile
  jest.spyOn(AuthContext, "useAuthState").mockImplementation(() => ({
    profile: {
      infos: {
        address: "88 Rue Baron Bouvier",
        zipcode: "77000",
        city: "Vesoul",
        country: "France",
      },
    },
  }));

  const { components, values } = renderModifyAddressForm();

  //Change input values as a user would
  fireEvent.change(components.addressField, {
    target: { value: values.newUserInfos.address },
  });
  fireEvent.change(components.zipcodeField, {
    target: { value: values.newUserInfos.zipcode },
  });
  fireEvent.change(components.cityField, { target: { value: values.newUserInfos.city } });
  fireEvent.change(components.countryField, {
    target: { value: values.newUserInfos.country },
  });

  //Check if new values are set
  await waitFor(() => expect(components.addressField.value).toBe("12 rue des plantes"));
  expect(components.zipcodeField.value).toBe("75000");
  expect(components.cityField.value).toBe("Paris");
  expect(components.countryField.value).toBe("France");
});

test("Test that fields can't be empty", async () => {
  //Mock useAuthState to provide mocked profile
  jest.spyOn(AuthContext, "useAuthState").mockImplementation(() => ({
    profile: {
      infos: {
        address: "88 Rue Baron Bouvier",
        zipcode: "77000",
        city: "Vesoul",
        country: "France",
      },
    },
  }));

  const { components, getAllByText } = renderModifyAddressForm();

  //Delete prefilled input values
  fireEvent.change(components.addressField, { target: { value: "" } });
  fireEvent.change(components.zipcodeField, { target: { value: "" } });
  fireEvent.change(components.cityField, { target: { value: "" } });
  fireEvent.change(components.countryField, { target: { value: "" } });

  //Click submit (required to make button disabled and error messages appear)
  fireEvent.click(components.submitButton);

  //Check if button is disabled and error message present
  //TODO: Uncomment when GradientButton can be disabled
  /* await waitFor(() => expect(components.submitButton).toBeDisabled()); */
  await waitFor(() => expect(getAllByText(/form:formRequiredField/i)).toHaveLength(4));
});

test("Firing test", async () => {
  //Mock useAuthState to provide mocked profile
  jest.spyOn(AuthContext, "useAuthState").mockImplementation(() => ({
    profile: {
      infos: {
        address: "88 Rue Baron Bouvier",
        zipcode: "77000",
        city: "Vesoul",
        country: "France",
      },
    },
  }));

  const { components, values, mockedFunctions } = renderModifyAddressForm();

  //Change input values as a user would
  fireEvent.change(components.addressField, {
    target: { value: values.newUserInfos.address },
  });
  fireEvent.change(components.zipcodeField, {
    target: { value: values.newUserInfos.zipcode },
  });
  fireEvent.change(components.cityField, { target: { value: values.newUserInfos.city } });
  fireEvent.change(components.countryField, {
    target: { value: values.newUserInfos.country },
  });

  //Click submit button
  fireEvent.click(components.submitButton);

  //Check if query has been called
  await waitFor(() => expect(mockedFunctions.mockUpdateUserInfosResult).toHaveBeenCalledTimes(1));
});
