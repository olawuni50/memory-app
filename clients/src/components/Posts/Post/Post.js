import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from "@mui/material"
import moment from "moment"
import {ThumbUpAlt, ThumbUpAltOutlined, Delete, MoreHoriz} from "@mui/icons-material"
import {useStyles} from "./PostStyles"
import { deletePost, likePost } from "../../../actions/posts"




const Post =({post, setCurrentId})=>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()
    const [likes, setLikes] = useState(post?.likes)

    const userId = user?.result.googleId || user?.result?._id
    const hasLikedPost = post.likes.find((like) => like === userId)

    const handleLike = async () =>{
        dispatch(likePost(post._id))

        if(hasLikedPost){
            setLikes(likes.filter((id) => id !== userId))
        } else{
             setLikes([...post.likes, userId])
        }
    }

   const Likes = () => {
       if(likes.length > 0) {
           return likes.find((like) => like === userId)
           ? (
               <><ThumbUpAlt fontSize="small" style={{textTransform:"none", fontSize:"13px"}} 
               />&nbsp;{likes.length > 2 ?`You and ${likes.length - 1} others`: `${likes.length} like${likes.length > 1 ? 's': ''}`}</>
           ) : (
               <> <ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
           )
       }
       return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
   }

   const openPost = () => history.push(`/posts/${post._id}`);


    return(
      
        <div className={classes.myCard}>
            
        <Card className={classes.card} raised elevation={6}>
           

            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            title={post.title} />

            <div className={classes.top}>

            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                <Button style={{color:"white"}} size="small" onClick={()=>setCurrentId(post._id)}>
                    <MoreHoriz fontSize="large" />                    
                </Button>
            </div>
            )}            

            </div>
            
            <ButtonBase onClick={openPost} className={classes.buttonBase}> 

            <CardContent>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
      
            <Typography className={classes.title} variant="h6" >{post.title}</Typography>
            <Typography className={classes.message} variant="body2" color="textSecondary" component="p"
            gutterBottom>{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
            </ButtonBase>
            
            <CardActions className={classes.action}>
                
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id===post?.creator)&& (
                        <Button size="small" color="primary" onClick={() =>
                        window.confirm (`Are you sure you want to delete ${post.title}?`) && dispatch(deletePost(post._id))}>
                        <Delete fontSize="small"/>
                        Delete
                    </Button>                    
                )}
                
 
                

            </CardActions>            

        </Card>
        </div>
        
    )
}

export default Post