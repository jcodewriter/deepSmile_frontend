import React from "react";
import { render } from "src/utils/tests/renderWithTheme";
import UdiniHomeUdiniKeyView from "../UdiniHomeUdiniKeyView";

describe("UdiniHomeUdiniKeyView", () => {
  test("translation", () => {
    const { getByText } = render(<UdiniHomeUdiniKeyView />);

    expect(getByText("udiniHome:processSectionTitle")).toBeInTheDocument();

    expect(getByText(/udiniHome:processSectionClinicalTitle/i)).toBeInTheDocument();
    expect(getByText(/udiniHome:processSectionClinicalFirstItem/i)).toBeInTheDocument();
    expect(getByText(/udiniHome:processSectionClinicalSecondItem/i)).toBeInTheDocument();

    expect(getByText(/udiniHome:processSectionWorkflowTitle/i)).toBeInTheDocument();
    expect(getByText(/udiniHome:processSectionWorkflowFirstItem/i)).toBeInTheDocument();
    expect(getByText(/udiniHome:processSectionWorkflowSecondItem/i)).toBeInTheDocument();
    expect(getByText(/udiniHome:processSectionWorkflowThirdItem/i)).toBeInTheDocument();

    expect(getByText(/udiniHome:processSectionTechTitle/i)).toBeInTheDocument();
    expect(getByText(/udiniHome:processSectionTechFirstItem/i)).toBeInTheDocument();
    expect(getByText(/udiniHome:processSectionTechSecondItem/i)).toBeInTheDocument();
  });
});
