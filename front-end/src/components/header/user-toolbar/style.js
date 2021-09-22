import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: 24,
  },
  username: {
    marginRight: 10,
    marginTop: 2,
  },
  badge: {
    cursor: "pointer",
  },
}));

export default useStyles;
