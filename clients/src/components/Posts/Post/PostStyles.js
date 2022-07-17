import {makeStyles} from "@mui/styles"
import { createTheme } from "@mui/material/styles"

const theme = createTheme()

export const useStyles = makeStyles({
    myCard:{
        marginTop: theme.spacing(1)
    },

    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
  
      },

      border: {
        border: 'solid',
      },

      fullHeightCard: {
        height: '100%',
      },

      card: {
        display: 'flex',
        marginTop:theme.spacing(8),
        [theme.breakpoints.down('sm')]:{
          marginTop:theme.spacing(5)
        },
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        width: "80%",
        position: 'relative',
       
      },
      
      message:{
        textAlign:"left",
        paddingRight:"3px",
        paddingLeft:"3px"
        // alignItems:"flex-start"
      },

      buttonBase:{
        '&:hover':{
          backgroundColor:"#896eff1a",
        }
      },

      overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
      },

      overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
      },

      grid: {
        display: 'flex',
      },

      details: {
        display: 'flex',
        alignItems: 'flex-start',
        textAlign:"justify",
        paddingRight:"3px",
        paddingLeft:"3px"
      },

      title: {
        textAlign:"justify",
        alignItems:"flex-start"
      },

      action: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      }
})