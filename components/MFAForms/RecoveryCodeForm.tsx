import { FC, useContext, useState } from "react";

import { useBranding } from "branding/useBranding";
import { ModalContext } from "context/Modal";

import { RecoveryCodeModal } from "Common/Modal/AuthorizationModal/RecoveryCodeModal";

export const RecoveryCodeForm: FC = () => {
  const { logoUrl } = useBranding();
  const modalContext = useContext(ModalContext);
  const {
    recoveryCodeModalOpen = false,
    setModalContext = () => {},
    recoveryCode = [],
    errorMessage,
    resetModalContext = () => {},
  } = modalContext;
  const [checked, setChecked] = useState(false);

  return (
    <RecoveryCodeModal
      open={recoveryCodeModalOpen}
      handleContinue={() => {
        setModalContext({
          recoveryCodeModalOpen: false,
          challengeModalOpen: true,
          comesFromEnrollment: true,
          errorMessage: null,
        });
      }}
      onClose={() => resetModalContext()}
      logoUrl={logoUrl}
      recoveryCode={recoveryCode}
      errorMessage={errorMessage}
      checked={checked}
      setChecked={setChecked}
    />
  );
};
