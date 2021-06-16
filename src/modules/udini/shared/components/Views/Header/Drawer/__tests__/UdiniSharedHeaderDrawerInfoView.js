import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniSharedHeaderDrawerInfoView from "../UdiniSharedHeaderDrawerInfoView";

describe("UdiniSharedHeaderDrawerInfoView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniSharedHeaderDrawerInfoView />);

    expect(getByText("udiniHeader:udiniContact")).toBeInTheDocument();
    expect(getByText("udiniHeader:udiniPhoneNumber")).toBeInTheDocument();
  });
});
