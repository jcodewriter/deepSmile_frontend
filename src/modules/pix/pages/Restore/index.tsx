import React from "react";
import PixSharedCenteredBlockLayout from "src/modules/pix/shared/components/Layouts/PixSharedCenteredBlockLayout";

import PixRestoreForm from "./Forms/PixRestoreForm";

//TODO: remove isDone

interface PixRestoreProps {
  token: string;
}
const PixRestore = ({ token }: PixRestoreProps) => {
  return (
    <PixSharedCenteredBlockLayout isDone={true}>
      <PixRestoreForm token={token} />
    </PixSharedCenteredBlockLayout>
  );
};

export default PixRestore;
