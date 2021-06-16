import { Grid } from "@chakra-ui/core";
import React from "react";
import withUdiniSharedPageLayout from "src/modules/udini/shared/hocs/withUdiniSharedPageLayout";
import UdiniTermsAndConditionsContentView from "../Views/UdiniTermsAndConditionsContentView";
import UdiniTermsAndConditionsTreeView from "../Views/UdiniTermsAndConditionsTreeView";

const UdiniTermsAndConditions = () => {
  return (
    <Grid gridTemplateColumns={{ base: "1fr", md: "0.6fr 1fr" }} minH="calc(100vh - 148px)">
      <UdiniTermsAndConditionsTreeView />
      <UdiniTermsAndConditionsContentView />
    </Grid>
  );
};

export default withUdiniSharedPageLayout(UdiniTermsAndConditions, false);
