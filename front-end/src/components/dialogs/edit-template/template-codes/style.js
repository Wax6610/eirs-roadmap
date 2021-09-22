import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  item: {
    marginRight: 5,
    marginBottom : 5
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default useStyles;
