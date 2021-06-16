import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniHomeExpertiseView from "../UdiniHomeExpertiseView";

describe("UdiniHomeExpertiseView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniHomeExpertiseView />);

    expect(getByText("udiniHome:expertiseSectionTitle")).toBeInTheDocument();
    expect(getByText("udiniHome:expertiseSectionText")).toBeInTheDocument();
  });
});
