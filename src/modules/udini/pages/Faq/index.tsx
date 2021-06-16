import React, { useState } from "react";
import { Grid } from "@chakra-ui/core";

import withUdiniSharedPageLayout from "../../shared/hocs/withUdiniSharedPageLayout";
import FaqLeftView from "./components/Views/FaqLeftView";
import FaqRightView from "./components/Views/FaqRightView";
import FaqResistrationAnswers from "./components/Answers/FaqResistrationAnswers";
import FaqSubscriptionsAnswers from "./components/Answers/FaqSubscriptionsAnswers";
import FaqConfidentialityAnswers from "./components/Answers/FaqConfidentialityAnswers";

const CATEGORIES = [
  {
    label: "registrationCategory",
    component: FaqResistrationAnswers,
  },
  {
    label: "subscriptionCategory",
    component: FaqSubscriptionsAnswers,
  },
  {
    label: "confidentialityCategory",
    component: FaqConfidentialityAnswers,
  },
];

const UdiniFaq = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].label);

  const activeCategoryModel = CATEGORIES.find((item) => item.label === activeCategory);

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: "0.6fr 1fr" }}
      paddingX={{ base: "25px", sm: 0 }}
      as="section"
      minH="calc(100vh - 148px)"
    >
      <FaqLeftView categories={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
      <FaqRightView>{activeCategoryModel && <activeCategoryModel.component />}</FaqRightView>
    </Grid>
  );
};

export default withUdiniSharedPageLayout(UdiniFaq, false);
