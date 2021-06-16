import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniSharedFooterCopyrightView from "../UdiniSharedFooterCopyrightView";

describe("UdiniSharedFooterCopyrightView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniSharedFooterCopyrightView />);

    expect(getByText("udiniFooter:copyright")).toBeInTheDocument();
  });
});
