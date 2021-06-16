import React from "react";
import PixLoginForm from "./components/Forms/PixLoginForm";
import PixSharedCenteredBlockLayout from "src/modules/pix/shared/components/Layouts/PixSharedCenteredBlockLayout";

const PixLogin = () => {
  return (
    <PixSharedCenteredBlockLayout>
      <PixLoginForm />
    </PixSharedCenteredBlockLayout>
  );
};

export default PixLogin;
