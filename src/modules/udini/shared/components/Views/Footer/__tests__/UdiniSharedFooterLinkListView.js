import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniSharedFooterLinkListView from "../UdiniSharedFooterLinkListView";

describe("UdiniSharedFooterLinkListView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniSharedFooterLinkListView />);

    expect(getByText("udiniFooter:exploreListTitle")).toBeInTheDocument();
    //expect(getByText("udiniHeader:aboutLink")).toBeInTheDocument();
    //expect(getByText("udiniHeader:productsText")).toBeInTheDocument();
    //expect(getByText("udiniHeader:communityLink")).toBeInTheDocument();

    expect(getByText("udiniFooter:businessListTitle")).toBeInTheDocument();
    expect(getByText("udiniFooter:writeUs")).toBeInTheDocument();

    expect(getByText("udiniFooter:followListTitle")).toBeInTheDocument();
    expect(getByText("Instagram")).toBeInTheDocument();
    expect(getByText("Facebook")).toBeInTheDocument();
    expect(getByText("LinkedIn")).toBeInTheDocument();

    expect(getByText("udiniFooter:legalListTitle")).toBeInTheDocument();
    expect(getByText("udiniFooter:legalListTerms")).toBeInTheDocument();
    expect(getByText("udiniFooter:legalListPrivacy")).toBeInTheDocument();
    expect(getByText("FAQ")).toBeInTheDocument();
  });

  // TODO: ADD router tests
  test.todo("navigation");
});
