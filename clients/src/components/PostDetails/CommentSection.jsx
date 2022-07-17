import React, {useState, useRef} from 'react'
import {useDispatch} from "react-redux"
import {Typography, TextField, Button} from "@mui/material"
import {useStyles} from "./PostDetailStyles"
import {commentPost} from '../../actions/posts'



const CommentSection = ({post}) =>{
    console.log(post)
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const commentsRef = useRef()

    const handleClick = async () =>{
        const finalComment =  `${user.result.name}: ${comment}`

      const newComments = await dispatch(commentPost(finalComment, post._id))
      setComments(newComments)
      setComment("")

      commentsRef.current.scrollIntoView({behavior:'smooth'})
    }

    return(
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} variant="subtitle1" className={classes.comment}>
                           <strong> {c.split(':')[0]}</strong>
                           {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>

                {user?.result?.name ? (
                <div className={classes.myComment}>
                <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                <TextField fullWidth rows={4} variant="outlined" label="Comment"
                multiline value={comment} name="comment" onChange={(e) => setComment(e.target.value)} />

                <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained"
                onClick={handleClick}>Comment</Button>
                </div>) : ("You must be logged in to comment")}
            </div>
        </div>
    )
}

export default CommentSection