import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniSharedFooterLogoView from "../UdiniSharedFooterLogoView";

describe("UdiniSharedFooterLogoView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniSharedFooterLogoView />);

    expect(getByText("udiniFooter:catchPhraseBold")).toBeInTheDocument();
    expect(getByText("udiniFooter:catchPhraseNormal")).toBeInTheDocument();
  });
});
