import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    width: 900,
  },
  field: {
    width: "100%",
    marginTop: 20,
  },
  buttons : {
    display : "flex",
    justifyContent : 'center'
  }
  ,button : {
    marginLeft : 10
  }
}));

export default useStyles;
