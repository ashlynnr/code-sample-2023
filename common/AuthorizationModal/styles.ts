import { makeStyles } from "@material-ui/core";

export const useAuthModalStyles = makeStyles(() => ({
  container: {
    height: "78vh",
    outline: "0 !important",
    "& focus": { outline: "0 !important" },
  },
  box: {
    width: "360px",
    maxHeight: "520px",
    margin: "auto",
    textAlign: "center",
    padding: "2.5rem",
    boxShadow: " 0 2px 8px 0 rgba(0,0,0,0.5)",
  },
  contentContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  errorContainer: {
    marginTop: 8,
    color: "red",
    fontSize: 16,
  },
}));
