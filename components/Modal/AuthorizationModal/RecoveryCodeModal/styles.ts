import { makeStyles } from "@material-ui/core";

export const useRecoveryCodeStyles = makeStyles(() => ({
  text: {
    fontSize: "1rem",
  },
  codeInput: {
    height: 46,
    width: 250,
    margin: "auto",
  },
  copyButton: {
    width: 250,
  },
  checkbox: {
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    width: 250,
    margin: "auto",
  },
  logo: {
    margin: "0px 0px 16px",
  },
  title: {
    fontSize: "1.5rem",
  },
}));
