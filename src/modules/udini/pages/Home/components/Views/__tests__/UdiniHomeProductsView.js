import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniHomeProductsView from "../UdiniHomeProductsView";

describe("UdiniHomeProductsView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniHomeProductsView />);

    expect(getByText("udiniHome:productsSectionPixTarget")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionPixBold")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionPixText")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionPixInfo")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionPixPromotion")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionPixBtn")).toBeInTheDocument();

    expect(getByText("udiniHome:productsSectionSmileTarget")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionSmileBold")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionSmileText")).toBeInTheDocument();
    expect(getByText("udiniHome:productsSectionSmileBtn")).toBeInTheDocument();
  });
});
