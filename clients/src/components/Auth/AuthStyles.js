import {makeStyles} from "@mui/styles"
import {createTheme} from "@mui/material/styles"


const theme = createTheme()

export const useStyles = makeStyles ({
    paper:{
        marginTop: theme.spacing(10),
        width: "40%",
        [theme.breakpoints.down('sm')]:{
            width:"auto"
        }
    },

    avatar:{
        margin:theme.spacing(1),
        backgroundColor:"red",
      
       
    },
    form:{
        padding: theme.spacing(3)
    },
    submit:{
        marginTop: theme.spacing(3)
    },
    sign:{
       display:"flex",
       justifyContent:"center",
       alignItems:"center"
    }
})