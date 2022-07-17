import React from "react"
import {Grid, TextField, InputAdornment, IconButton} from "@mui/material"
import  Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { makeStyles } from "@mui/styles"


const useStyles = makeStyles({
        // text:{
        //     padding: "1px",
        // }
})


const Input = ({name, half, label, autoFocus, handleChange, handleShowPassword, type}) =>{
    const classes = useStyles()

    return(
       <Grid item xs={12} sm={half ? 6 : 12}>
           <TextField className={classes.text} name ={name} onChange={handleChange} variant="outlined"
           required fullWidth label={label} autoFocus={autoFocus} type={type} InputProps = {name === 'password' ? {
               endAdornment :(
                   <InputAdornment position="end">
                       <IconButton onClick={handleShowPassword}>
                           {type === "password" ? <Visibility/>:<VisibilityOff /> }
                       </IconButton>
                   </InputAdornment>
               )
           }: null}
           />
       </Grid>
    )
}

export default Input