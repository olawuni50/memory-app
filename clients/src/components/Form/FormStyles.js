import {makeStyles} from "@mui/styles"
import { createTheme } from '@mui/material/styles';

const theme = createTheme()

export const useStyles = makeStyles({
    paper: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    typo:{
        padding: theme.spacing(2)
    },

    form:{
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    
    text: {
        marginBottom:theme.spacing(3)
    },
    button: {
        marginBottom: theme.spacing(1)
    },
    file: {
        marginBottom: theme.spacing(2)
    }

})
