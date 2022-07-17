import {makeStyles} from "@mui/styles"
import { createTheme } from '@mui/material/styles';

const theme = createTheme()

export const useStyles = makeStyles({
    appBarSearch: {
        borderRadius: 4,
        marginTop:theme.spacing(10),
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px'
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
    },
    gridContainer: {
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column-reverse'
        }
    }
})