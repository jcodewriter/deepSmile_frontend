import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniHomeCountView from "../UdiniHomeCountView";

describe("UdiniHomeCountView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniHomeCountView />);

    expect(getByText("udiniHome:descriptionSectionText")).toBeInTheDocument();
    expect(getByText("udiniHome:descriptionSectionBtn")).toBeInTheDocument();
  });
});
