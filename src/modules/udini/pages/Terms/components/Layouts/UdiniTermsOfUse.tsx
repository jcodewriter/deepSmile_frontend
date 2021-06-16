import { Grid } from "@chakra-ui/core";
import React from "react";
import withUdiniSharedPageLayout from "src/modules/udini/shared/hocs/withUdiniSharedPageLayout";
import UdiniTermsOfUseContentView from "../Views/UdiniTermsOfUseContentView";
import UdiniTermsOfUseTreeView from "../Views/UdiniTermsOfUseTreeView";

const UdiniTermsOfUse = () => {
  return (
    <Grid gridTemplateColumns={{ base: "1fr", md: "0.6fr 1fr" }} minH="calc(100vh - 148px)">
      <UdiniTermsOfUseTreeView />
      <UdiniTermsOfUseContentView />
    </Grid>
  );
};

export default withUdiniSharedPageLayout(UdiniTermsOfUse, false);
