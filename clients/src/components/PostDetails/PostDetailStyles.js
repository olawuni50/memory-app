import {makeStyles} from "@mui/styles"
import {createTheme} from "@mui/material/styles"

const theme = createTheme()

export const useStyles = makeStyles({
    postDetail:{
        marginTop:"5rem",
        display:"flex",
        justifyContent:"space-between",
        padding:"10px",
        borderRadius:"20px",
        [theme.breakpoints.down('sm')]:{
            flexDirection:"column",
            width:"auto",
            height:"auto",            
        }
    }, 
    
    imgg:{
        width:"500px",
        height:"300px",
        borderRadius:"20px",
        [theme.breakpoints.down('sm')]:{
            width:"auto",
            height:"auto"
        }
    },

    text:{
        width:"50%",
        [theme.breakpoints.down('sm')]:{
            width:"auto"
        }
    },
    
    recommend:{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr 1fr",
        [theme.breakpoints.down('sm')]:{
            gridTemplateColumns:"1fr"
        }
    },

    post:{
        // border:"3px solid #896eff1a",
         width:"80%"
    },

    // CommentSection
    commentsOuterContainer:{
        display:"flex",
        justifyContent:'space-between',
        [theme.breakpoints.down('sm')]:{
            flexDirection:"column-reverse",
        }
        
        },
    commentsInnerContainer:{
            height:'200px',
             overflowY:"auto",
             marginRight:"30px"
    },

    comment:{
        display:"flex",
        flexDirection:"column",        
    },

    myComment:{
        width:"70%",
        [theme.breakpoints.down('sm')]:{
            width:"auto"
        }
    }
    

})