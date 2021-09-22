import { createMuiTheme } from '@material-ui/core';
import { green, blueGrey } from '@material-ui/core/colors';


const generalTheme = createMuiTheme({
    palette: {
        primary: green,
        secondary: blueGrey
    }
});

export default generalTheme;