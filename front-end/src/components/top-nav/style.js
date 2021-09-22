import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonsRow: {
    display: "flex",
  },
  buttonsRowBottom: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
    padding : '0 10px'
  },
  loadGrid: {
    marginRight: 5,
  },
  formControl: {
    flexGrow: 1,
    width: 200,
  },
  root: {
    margin: "5px 10px",
  },
  temlplateMenu: {
    color: "red",
  },
  filterEnabled: {
    color: "red",
    marginLeft: 3,
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    marginLeft: 20,
  },
  button: { marginLeft: 3 },
  buttonsLabel: {
    marginLeft: 20,
    marginBottom: 5,
  },
  buttonsMenu : {
    display : 'flex',
    justifyContent : "space-between"
  }
}));

export default useStyles;
