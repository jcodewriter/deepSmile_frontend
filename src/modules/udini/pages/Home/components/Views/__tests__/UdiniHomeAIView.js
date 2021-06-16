import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniHomeAIView from "../UdiniHomeAIView";

describe("UdiniHomeAIView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniHomeAIView />);

    expect(getByText("udiniHome:aiSectionTitle")).toBeInTheDocument();
    expect(getByText("udiniHome:aiSectionText")).toBeInTheDocument();
  });
});
