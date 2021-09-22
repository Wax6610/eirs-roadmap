import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginLeft: 5,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  divider: {
    marginTop: 10,
  },
}));

export default useStyles;
