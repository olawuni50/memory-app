import React from 'react'
import Post from './Post/Post'
import {makeStyles} from "@mui/styles"
import {createTheme} from "@mui/material/styles"
import {Grid, CircularProgress} from '@mui/material'
import Load1 from "../Loading/Load1"
import { useSelector } from 'react-redux'

const theme = createTheme()

const useStyles = makeStyles({
    container:{
        maxWidth: "1000px",
        margin: "auto 0",
        marginBottom:theme.spacing(3)
    }
})

const Posts = ({setCurrentId}) => {
    const classes = useStyles()
    // the "posts" is from reducers/index.js
    const {posts, isLoading} = useSelector((state) => state.posts)

    if(!posts.length && !isLoading) return 'No posts';
 
    return (
        
               isLoading ? <Load1 /> : (
                   <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                       {posts.map((post) =>(
                           <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                               <Post post={post} setCurrentId={setCurrentId} />
                               </Grid>
                       ))}
                   </Grid>
               )        
    )
}

export default Posts
