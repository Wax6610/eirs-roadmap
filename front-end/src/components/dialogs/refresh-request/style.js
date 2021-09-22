import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  content: {
    width: 900,
  },
  field: {
    width: "100%",
    marginTop: 20,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginLeft: 10,
  },
  divider: { marginTop: 10 },
  resultHeader: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
  },
  errors: {
    display: "flex",
    flexDirection: "column",
  },
  successNumber: {
    color: "green",
    marginLeft: 5,
  },
  failedNumber: {
    color: "red",
    marginLeft: 5,
  },
  successSerialList: {
    display: "flex",
    flexDirection: "column",
  },
  errorMessage: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
}));

export default useStyles;
