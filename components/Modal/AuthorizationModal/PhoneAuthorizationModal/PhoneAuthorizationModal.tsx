import { FC } from "react";
import { Typography, Box } from "@material-ui/core";
import {
  AuthorizationModal,
  GridCol,
  PrimaryButton,
  Logo,
  InputControllerProps,
  PhoneInput,
} from "@xxx/frontend-common";

import { CONTINUE } from "Commmon/constants";
import { useCommonStyles } from "../styles";
import { SECURE_YOUR_ACCOUNT, ENTER_PHONE_NUMBER } from "../constants";

type PhoneAuthProps = {
  open: boolean;
  handleContinue?: () => void;
  onClose?: () => void;
  logo?: string;
  input: InputControllerProps;
  isLoading: boolean;
};

type ActionsProps = {
  handleContinue: () => void;
  isLoading: boolean;
};

type ErrorProps = {
  errorMessage?: string | null;
};

type HeaderProps = {
  logo?: string;
};

type ContentProps = {
  input: InputControllerProps;
};

const Header = ({ logo }: HeaderProps) => {
  const classes = useCommonStyles();

  return (
    <div>
      <Logo src={logo} className={classes.logo} />
      <Typography className={classes.title}>{SECURE_YOUR_ACCOUNT}</Typography>
    </div>
  );
};

const Content = ({ input }: ContentProps) => {
  const classes = useCommonStyles();
  const { name } = input;
  return (
    <GridCol>
      <Typography className={classes.text}>{ENTER_PHONE_NUMBER}</Typography>
      <Box pt={3} pb={2}>
        <PhoneInput name={name} label="Phone Number" adornment input={input} />
      </Box>
    </GridCol>
  );
};

const Actions: FC<ActionsProps> = ({ handleContinue, isLoading }) => {
  return (
    <PrimaryButton type="submit" disabled={isLoading} onClick={handleContinue}>
      {CONTINUE}
    </PrimaryButton>
  );
};

const ErrorMessage: FC<ErrorProps> = ({ errorMessage }) => {
  return <Typography>{errorMessage || ""}</Typography>;
};

export const PhoneAuthorizationModal: FC<PhoneAuthProps> = ({
  open,
  handleContinue = () => {},
  onClose = () => {},
  logo,
  input,
  isLoading,
}) => {
  return (
    <AuthorizationModal
      onClose={onClose}
      open={open}
      header={<Header logo={logo} />}
      content={<Content input={input} />}
      actions={
        <Actions handleContinue={handleContinue} isLoading={isLoading} />
      }
      error={<ErrorMessage errorMessage={input.errorMessage} />}
    />
  );
};
