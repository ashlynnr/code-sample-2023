import { makeStyles } from "@material-ui/core";

export const useChallengeModalStyles = makeStyles(({ palette }) => ({
  icon: {
    fontSize: "4.5rem",
    color: palette.primary.main,
  },
  text: {
    fontSize: "1rem",
  },
  title: {
    fontSize: "1.5rem",
  },
  logo: {
    margin: "0px 0px 16px",
    height: "unset",
  },
  input: {
    height: "46px",
    width: "250px",
    margin: "auto",
    color: "black !important",
  },
  link: {
    fontWeight: 400,
    fontSize: "1rem",
    color: "#0076D1",
    display: "inline",
    cursor: "pointer",
    "&:hover": {
      fontWeight: 700,
    },
  },
  footerContainer: {
    marginTop: "12px",
  },
  continueButton: {
    width: "250px",
  },
}));
