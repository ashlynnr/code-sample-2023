import { useState, Dispatch, FC, FormEvent, SetStateAction } from "react";
import {
  Typography,
  Box,
  OutlinedInput,
  OutlinedInputProps,
} from "@material-ui/core";
import {
  AuthorizationModal,
  GridCol,
  Logo,
  PrimaryButton,
} from "@xxx/frontend-common";
import InputMask, { Props } from "react-input-mask";
import { useChallengeModalStyles } from "./styles";
import { CONTINUE, RESEND } from "Common/constants";
import {
  CODE_RESENT,
  CODE_VALID_TIME,
  DID_NOT_RECEIVE_CODE,
  ENTER_CODE,
  SENT_TEXT,
  VERIFY_YOUR_IDENTITY,
} from "../constants";

type ChallengeModalProps = {
  open: boolean;
  handleContinue: () => void;
  onClose: () => void;
  handleResend: () => void;
  onEditPhoneNumber: () => void;
  maskedPhoneNumber?: string;
  logoUrl?: string;
  comesFromEnrollment: boolean;
  setMFACode: Dispatch<SetStateAction<string>>;
  errorMessage?: string | null;
  isLoading: boolean;
};

type HeaderProps = {
  logoUrl?: string;
};

type ContentProps = {
  onEditPhoneNumber: () => void;
  maskedPhoneNumber?: string;
  comesFromEnrollment: boolean;
  setMFACode: Dispatch<SetStateAction<string>>;
  resendMessage: boolean;
};

type ActionsProps = {
  handleContinue: () => void;
  handleResend: () => void;
  isLoading: boolean;
  setResendMessage: Dispatch<SetStateAction<boolean>>;
};

type ErrorProps = {
  errorMessage?: string | null;
};

const Header: FC<HeaderProps> = ({ logoUrl }) => {
  const classes = useChallengeModalStyles();
  return (
    <div>
      <Logo src={logoUrl} className={classes.logo} />
      <Typography className={classes.title}>{VERIFY_YOUR_IDENTITY}</Typography>
    </div>
  );
};

const Content: FC<ContentProps> = ({
  maskedPhoneNumber,
  comesFromEnrollment,
  setMFACode,
  resendMessage,
}) => {
  const classes = useChallengeModalStyles();

  const handleOnInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setMFACode(target.value);
  };

  return (
    <GridCol>
      <Typography className={classes.text}>{CODE_VALID_TIME}</Typography>
      <Typography className={classes.text}>
        {resendMessage ? { CODE_RESENT } : { SENT_TEXT }}
      </Typography>
      <Box pt={3} pb={2}>
        <InputMask
          disabled
          value={
            comesFromEnrollment
              ? `XXXXXXXX${maskedPhoneNumber?.slice(-4)}`
              : maskedPhoneNumber
          }
          mask="+X XXX-XXX-9999"
          name="recovery_code"
        >
          {(inputProps: Props & OutlinedInputProps) => (
            <OutlinedInput
              {...inputProps}
              inputProps={{
                min: 0,
                style: { textAlign: "center", fontSize: "1.1rem" },
              }}
              className={classes.input}
              disabled
            />
          )}
        </InputMask>
      </Box>
      <Box>
        <InputMask mask="999999" name="recovery_code" onChange={handleOnInput}>
          {(inputProps: Props & OutlinedInputProps) => (
            <OutlinedInput
              {...inputProps}
              inputProps={{
                min: 0,
                style: { textAlign: "center", fontSize: "1.1rem" },
              }}
              placeholder={ENTER_CODE}
              className={classes.input}
            />
          )}
        </InputMask>
      </Box>
    </GridCol>
  );
};

const Actions: FC<ActionsProps> = ({
  handleContinue,
  handleResend,
  isLoading,
  setResendMessage,
}) => {
  const classes = useChallengeModalStyles();
  return (
    <>
      <PrimaryButton
        disabled={isLoading}
        className={classes.continueButton}
        onClick={handleContinue}
      >
        {CONTINUE}
      </PrimaryButton>
      <Box className={classes.footerContainer}>
        <Typography className={classes.text}>
          {DID_NOT_RECEIVE_CODE}
          <Typography
            className={classes.link}
            onClick={() => {
              handleResend();
              setResendMessage(true);
            }}
          >
            {RESEND}
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

const ErrorMessage: FC<ErrorProps> = ({ errorMessage }) => {
  return <Typography>{errorMessage || ""}</Typography>;
};

export const ChallengeModal: FC<ChallengeModalProps> = ({
  open,
  handleContinue,
  onClose,
  logoUrl,
  handleResend,
  onEditPhoneNumber,
  maskedPhoneNumber,
  comesFromEnrollment,
  setMFACode,
  errorMessage,
  isLoading,
}) => {
  const [resendMessage, setResendMessage] = useState(false);
  return (
    <AuthorizationModal
      onClose={onClose}
      open={open}
      header={<Header logoUrl={logoUrl} />}
      content={
        <Content
          setMFACode={setMFACode}
          onEditPhoneNumber={onEditPhoneNumber}
          maskedPhoneNumber={maskedPhoneNumber}
          comesFromEnrollment={comesFromEnrollment}
          resendMessage={resendMessage}
        />
      }
      actions={
        <Actions
          handleContinue={handleContinue}
          isLoading={isLoading}
          handleResend={handleResend}
          setResendMessage={setResendMessage}
        />
      }
      error={<ErrorMessage errorMessage={errorMessage} />}
    />
  );
};
