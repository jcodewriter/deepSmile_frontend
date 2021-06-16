import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniSharedCommunitySectionView from "../UdiniSharedCommunitySectionView";

describe("UdiniSharedCommunitySectionView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniSharedCommunitySectionView />);

    expect(getByText("udiniSharedCommunitySection:title")).toBeInTheDocument();
    expect(getByText("udiniSharedCommunitySection:text")).toBeInTheDocument();
    expect(getByText("udiniSharedCommunitySection:button")).toBeInTheDocument();
  });

  // TODO: ADD router tests
  test.todo("button go to COMMUNITY_FORM");
});
