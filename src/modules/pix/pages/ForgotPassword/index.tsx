import React, { useState } from "react";
import PixForgotPasswordForm from "./components/Forms/PixForgotPasswordForm";
import PixForgotPasswordFormEmailSentView from "./components/Views/PixForgotPasswordFormEmailSentView";
import PixSharedCenteredBlockLayout from "src/modules/pix/shared/components/Layouts/PixSharedCenteredBlockLayout";

const PixForgotPassword = () => {
  const [isDone, setStatut] = useState(false);

  const onChangeStatut = () => {
    setStatut(true);
  };

  return (
    <PixSharedCenteredBlockLayout isDone={isDone}>
      <PixForgotPasswordFormEmailSentView display={isDone ? "normal" : "none"} />
      <PixForgotPasswordForm onChangeStatut={onChangeStatut} display={isDone ? "none" : "normal"} />
    </PixSharedCenteredBlockLayout>
  );
};

export default PixForgotPassword;
