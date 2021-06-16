import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniHomeDescriptionView from "../UdiniHomeDescriptionView";

describe("UdiniHomeDescriptionView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniHomeDescriptionView />);

    expect(getByText("udiniHome:presentationSectionTitle")).toBeInTheDocument();
    expect(getByText("udiniHome:presentationSectionText")).toBeInTheDocument();
  });
});
