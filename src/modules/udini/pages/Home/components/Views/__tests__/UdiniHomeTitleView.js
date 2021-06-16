import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniHomeTitleView from "../UdiniHomeTitleView";

describe("UdiniHomeTitleView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniHomeTitleView />);

    expect(getByText("udiniHome:firstCarouselTitle")).toBeInTheDocument();
    expect(getByText("udiniHome:firstCarouselText")).toBeInTheDocument();

    expect(getByText("udiniHome:secondCarouselTitle")).toBeInTheDocument();
    expect(getByText("udiniHome:secondCarouselText")).toBeInTheDocument();

    expect(getByText("udiniHome:thirdCarouselTitle")).toBeInTheDocument();
    expect(getByText("udiniHome:thirdCarouselText")).toBeInTheDocument();

    expect(getByText("udiniHome:carouselBtn")).toBeInTheDocument();
  });
});
