import React from "react";
import PixFunnelBeginStep from "./components/Steps/PixFunnelBeginStep";
import { useRouter } from "next/router";
import PixFunnelForm from "./components/Forms/PixFunnelForm";

const PixFunnel = () => {
  const router = useRouter();
  const stage = router.query.stage || "begin";

  return stage === "begin" ? <PixFunnelBeginStep /> : <PixFunnelForm />;
};

export default PixFunnel;
