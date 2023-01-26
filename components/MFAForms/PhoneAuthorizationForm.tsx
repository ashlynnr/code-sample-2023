import { useState, FC, useContext } from "react";
import { datadogLogs } from "@datadog/browser-logs";

import { enrollUserMFA } from "api/apiAuth";
import { useBranding } from "branding/useBranding";
import { ModalContext } from "context/Modal";

import { PhoneAuthorizationModal } from "Common/Modal/AuthorizationModal/PhoneAuthorizationModal";
import { GENERIC_ERROR_MESSAGE, INVALID_PHONE } from "./constants";

export const PhoneAuthorizationForm: FC = () => {
  const { logoUrl } = useBranding();
  const [verificationPhone, setVerificationPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const modalContext = useContext(ModalContext);
  const {
    phoneModalOpen = false,
    setModalContext = () => {},
    errorMessage,
    resetModalContext = () => {},
  } = modalContext;

  const enrollUser = async (phone: string) => {
    const { memberId } = datadogLogs.getLoggerGlobalContext();
    const enrollUser = await enrollUserMFA({
      phone_number: phone,
      oob_channels: ["sms"],
      authenticator_types: ["oob"],
      member_id: memberId,
    });

    if (enrollUser.error) {
      setModalContext({
        errorMessage: enrollUser.error,
      });
    } else {
      setModalContext({
        phoneModalOpen: false,
        recoveryCodeModalOpen: true,
        phoneNumberMFA: phone,
        recoveryCode: enrollUser.respBody.recovery_codes?.[0],
        errorMessage: null,
      });
    }
  };

  const attemptMFALogin = async () => {
    setLoading(true);

    try {
      const phone = `+1${verificationPhone.replace(/[_-]/g, "")}`;
      const phoneIsValid = phone.length === 12;

      if (phoneIsValid) {
        enrollUser(phone);
      } else {
        setModalContext({
          errorMessage: INVALID_PHONE,
        });
      }
    } catch {
      setModalContext({
        errorMessage: GENERIC_ERROR_MESSAGE,
      });
    } finally {
      setLoading(false);
    }

    return null;
  };

  return (
    <PhoneAuthorizationModal
      onClose={() => {
        resetModalContext();
        setVerificationPhone("");
      }}
      input={{
        name: "verification_phone",
        value: verificationPhone,
        setValue: setVerificationPhone,
        errorMessage,
      }}
      open={phoneModalOpen}
      logo={logoUrl || ""}
      handleContinue={() => attemptMFALogin()}
      isLoading={loading}
    />
  );
};
