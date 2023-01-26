import { FC, useContext, useState } from "react";
import { datadogLogs } from "@datadog/browser-logs";
import { useHistory } from "react-router-dom";

import { useBranding } from "branding/useBranding";
import { ModalContext } from "context/Modal";
import { challengeSMS, loginWithMFA } from "api/apiAuth";
import { MFAMemberInfo } from "Types/member";
import { UnauthenticatedAppRoutes } from "routes/AppRoutes";

import { ChallengeModal } from "Common/Modal/AuthorizationModal/ChallengeModal";
import { GENERIC_ERROR_MESSAGE, INVALID_CODE_ERROR_MESSAGE } from "./constants";

type Props = {
  getLoginInformation: (userData: MFAMemberInfo) => void;
};

export const ChallengeForm: FC<Props> = ({ getLoginInformation }) => {
  const { logoUrl } = useBranding();
  const modalContext = useContext(ModalContext);
  const [MFAcode, setMFACode] = useState("");
  const [isMFACallLoading, setIsMFACallLoading] = useState(false);
  const history = useHistory();

  const {
    challengeModalOpen = false,
    setModalContext = () => {},
    errorMessage,
    comesFromEnrollment = false,
    phoneNumberMFA,
    resetModalContext = () => {},
  } = modalContext;

  const { memberId } = datadogLogs.getLoggerGlobalContext();

  if (!challengeModalOpen) {
    return null;
  }

  const handleContinue = async () => {
    try {
      setIsMFACallLoading(true);
      const response = await (
        await loginWithMFA({
          challenge_code: MFAcode,
          member_id: memberId,
        })
      ).json();
      if (response?.token) {
        getLoginInformation(response);
        setModalContext({ errorMessage: null });
      }

      if ([401, 403].includes(response?.status)) {
        if (
          response?.error === "expired_token" ||
          response?.detail === "Missing Session Details"
        ) {
          setModalContext({ challengeModalOpen: false });
          history.push(UnauthenticatedAppRoutes.Login);
        } else {
          setModalContext({
            errorMessage: INVALID_CODE_ERROR_MESSAGE,
          });
        }
      } else if (response?.status > 400) {
        setModalContext({
          errorMessage: GENERIC_ERROR_MESSAGE,
        });
      }
    } catch (error) {
      setModalContext({
        errorMessage: GENERIC_ERROR_MESSAGE,
      });
    } finally {
      setIsMFACallLoading(false);
    }
  };

  return (
    <ChallengeModal
      logoUrl={logoUrl}
      comesFromEnrollment={comesFromEnrollment}
      maskedPhoneNumber={phoneNumberMFA}
      open={challengeModalOpen}
      onClose={() => {
        resetModalContext();
        setMFACode("");
      }}
      handleContinue={() => handleContinue()}
      handleResend={() =>
        challengeSMS({
          member_id: memberId,
          mfa_type: "sms",
          mfa_token: "",
        }).catch(() =>
          setModalContext({
            errorMessage: "Unable to resend code.",
          })
        )
      }
      onEditPhoneNumber={() =>
        setModalContext({
          challengeModalOpen: false,
          phoneModalOpen: true,
        })
      }
      setMFACode={setMFACode}
      errorMessage={errorMessage}
      isLoading={isMFACallLoading}
    />
  );
};
