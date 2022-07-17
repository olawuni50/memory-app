import React, {useState, useEffect} from 'react'
import {useDispatch} from "react-redux"
import decode from 'jwt-decode'
import { Link, useHistory, useLocation } from 'react-router-dom'
import {AppBar, Avatar, Toolbar, Typography, Button} from "@mui/material"
import {makeStyles}from "@mui/styles"
import {createTheme} from "@mui/material/styles"


const theme = createTheme()

const useStyles = makeStyles({
    app:{
        maxWidth: "100%",
        top: '0'
    },
    
    heading:{
        textDecoration:"none",
        color:"#fff",
        marginTop:"10px",
        [theme.breakpoints.down('sm')]:{
            fontSize:"1.5rem",
            marginTop:"12px"
        }
    },
    tool:{
        display:"flex",
        flexDirection:"column",
    },
    all:{
        display:"flex",
        justifyContent:"space-between",
        alignItems: "center"
    },
    profile:{
        display:"flex",
        justifyContent:"space-between",
        alignItems: "center"
    },
    purple:{
        marginRight:"5px",
        color:"red",
    },
    username:{
    marginRight:"5px"
    },
    
    logout:{

    }
   

})



const NavBar = () => {
    const classes = useStyles()
    // Retrieving data from local storage (set by reducer(auth.js))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    console.log(user)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    

    const logout = () =>{
        // from reducer(auth.js)
        dispatch({type: "LOGOUT"})
        history.push('/')
        setUser(null)
    }

    useEffect(() =>{
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

  
    return (
        <AppBar position="fixed" className={classes.app}>
            <div className={classes.all}>
            <Toolbar className={classes.tool}>
                <Typography variant="h4" component={Link} to="/" className={classes.heading}
                >Memories</Typography>
             
            </Toolbar>

            <Toolbar>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name}
                         src={user.result.imageUrl}>{user.result.name.charAt(1)}</Avatar>
                        <Typography className={classes.username} variant="h6">
                           {user.result.name} 
                        </Typography>

                        <Button variant="contained"color="secondary" size="small" className={classes.logout}
                        onClick={logout}>Log out</Button>
                        </div>
                ) :(
                    <Button component={Link} to="/auth" variant="contained" size="small" color="secondary">
                        Sign in</Button>
                ) }
            </Toolbar>
            </div>
        </AppBar>
    )
}

export default NavBar
