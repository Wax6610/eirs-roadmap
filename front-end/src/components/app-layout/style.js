import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: theme.palette.primary.light,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  body: {
    flex: "100 1 auto",
    display: "flex",
  },
  footer: {
    flex: "0 2 auto",
    backgorundColor: theme.palette.secondary.dark,
  },

}));

export default useStyles;
