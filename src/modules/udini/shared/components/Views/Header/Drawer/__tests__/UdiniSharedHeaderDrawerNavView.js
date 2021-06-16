import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniSharedHeaderDrawerNavView from "../UdiniSharedHeaderDrawerNavView";

describe("UdiniSharedHeaderDrawerNavView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniSharedHeaderDrawerNavView />);

    expect(getByText("udiniHeader:homeLink")).toBeInTheDocument();
    //expect(getByText("udiniHeader:productsText")).toBeInTheDocument();
    //expect(getByText("udiniHeader:communityLink")).toBeInTheDocument();

    //expect(getByText("udiniHeader:productPixLink")).toBeInTheDocument();
    //expect(getByText("udiniHeader:productSmileLink")).toBeInTheDocument();
  });

  // TODO: ADD NAV TESTS
  test.todo("navigation");
});
