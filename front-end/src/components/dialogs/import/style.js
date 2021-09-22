import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    width: 900,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    display: "none",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems : 'center',
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize : 18,
    textAlign : 'center'
  },
  name : {
    fontWeight: "bold",
    fontSize : 18,
    marginRight: 10
  }
}));

export default useStyles;
