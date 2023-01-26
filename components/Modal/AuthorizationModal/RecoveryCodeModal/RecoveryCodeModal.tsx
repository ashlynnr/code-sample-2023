import { Dispatch, FC, SetStateAction, useContext } from "react";
import { Typography, Box, Checkbox, OutlinedInput } from "@material-ui/core";
import {
  AuthorizationModal,
  GridCol,
  Logo,
  PrimaryButton,
  SecondaryButton,
} from "@xxx/frontend-common";

import { ModalContext } from "context";

import { CONTINUE } from "Common/constants";
import { useRecoveryCodeStyles } from "./styles";
import { useCommonStyles } from "../styles";
import {
  ALMOST_THERE,
  COPY_CODE,
  COPY_THIS_CODE,
  RECORDED_CONFIRMATION,
} from "../constants";

type RecoveryCodeProps = {
  open: boolean;
  handleContinue: () => void;
  onClose: () => void;
  logoUrl?: string;
  recoveryCode: string;
  errorMessage?: string | null;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  loginForm?: boolean;
};

type ActionsProps = {
  handleContinue: () => void;
  checked: boolean;
  loginForm?: boolean;
};

type HeaderProps = {
  logoUrl?: string;
};

type ContentProps = {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  recoveryCode: string;
};

type ErrorProps = {
  errorMessage?: string | null;
};

const Header = ({ logoUrl }: HeaderProps) => {
  const recoveryClasses = useRecoveryCodeStyles();
  const commonClasses = useCommonStyles();

  return (
    <div>
      <Logo src={logoUrl} className={commonClasses.logo} />
      <Typography className={recoveryClasses.title}>{ALMOST_THERE}</Typography>
    </div>
  );
};

const Content = ({ recoveryCode, checked, setChecked }: ContentProps) => {
  const recoveryClasses = useRecoveryCodeStyles();
  const copyToClipboard = () => {
    try {
      window.navigator.clipboard.writeText(recoveryCode);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GridCol>
      <Typography className={recoveryClasses.text}>{COPY_THIS_CODE}</Typography>
      <Box pt={3} pb={2}>
        <OutlinedInput
          name="recovery_code"
          className={recoveryClasses.codeInput}
          disabled
          value={recoveryCode}
        />
      </Box>
      <Box>
        <SecondaryButton
          onClick={copyToClipboard}
          className={recoveryClasses.copyButton}
        >
          {COPY_CODE}
        </SecondaryButton>
      </Box>
      <Box className={recoveryClasses.checkbox}>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />{" "}
        <Typography className={recoveryClasses.text}>
          {RECORDED_CONFIRMATION}
        </Typography>
      </Box>
    </GridCol>
  );
};

const Actions: FC<ActionsProps> = ({ handleContinue, checked, loginForm }) => {
  const modalContext = useContext(ModalContext);
  const { setModalContext = () => {} } = modalContext;

  return (
    <PrimaryButton
      onClick={() => {
        if (loginForm && !checked) {
          handleContinue();
        }

        return checked
          ? handleContinue()
          : setModalContext({
              errorMessage: "You must check the box before continuing",
            });
      }}
      disabled={!checked}
    >
      {CONTINUE}
    </PrimaryButton>
  );
};

const ErrorMessage: FC<ErrorProps> = ({ errorMessage }) => {
  return <Typography>{errorMessage || ""}</Typography>;
};

export const RecoveryCodeModal: FC<RecoveryCodeProps> = ({
  open,
  handleContinue,
  onClose,
  logoUrl,
  recoveryCode,
  errorMessage,
  checked,
  setChecked,
  loginForm,
}) => {
  return (
    <AuthorizationModal
      onClose={onClose}
      open={open}
      header={<Header logoUrl={logoUrl} />}
      content={
        <Content
          recoveryCode={recoveryCode}
          checked={checked}
          setChecked={setChecked}
        />
      }
      actions={
        <Actions
          handleContinue={handleContinue}
          checked={checked}
          loginForm={loginForm}
        />
      }
      error={<ErrorMessage errorMessage={errorMessage} />}
    />
  );
};
