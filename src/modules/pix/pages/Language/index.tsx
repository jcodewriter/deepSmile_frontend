import React from "react";
import PixSharedSidebarLayout from "src/modules/pix/shared/components/Layouts/PixSharedSidebarLayout";
import PixLanguageForm from "./components/Forms/PixLanguageForm";

const PixLanguage = () => {
  return (
    <PixSharedSidebarLayout isProfile={true}>
      <PixLanguageForm />
    </PixSharedSidebarLayout>
  );
};

export default PixLanguage;
