import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniSharedCountView, { UDINI_SHARED_COUNT_VIEW_STAT_LIST } from "../UdiniSharedCountView";

describe("UdiniSharedCountView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniSharedCountView />);

    UDINI_SHARED_COUNT_VIEW_STAT_LIST.forEach(({ stat, label }) => {
      expect(getByText(`udiniHome:${stat}`)).toBeInTheDocument();
      expect(getByText(`udiniHome:${label}`)).toBeInTheDocument();
    });
  });
});
