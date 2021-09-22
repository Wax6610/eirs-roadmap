import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  header: {
    fontSize: 20,
    paddingBottom: 0,
  },
  icon: {
    marginLeft: 10,
  },
  content: {
    padding: 0,
  },
  list: {
    listStyle: "none",
  },
  listItem: {
    marginTop: 5,
  },
}));

export default useStyles;
