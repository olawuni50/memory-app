import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams, useHistory} from "react-router-dom"
import moment from 'moment'
import {Paper, Typography, Divider} from '@mui/material'
import Load1 from '../Loading/Load1'
import CommentSection from "./CommentSection"
import {getPost, getPostsBySearch} from "../../actions/posts"
import {useStyles} from "../PostDetails/PostDetailStyles"


const PostDetail = () => {
    const classes = useStyles()
    // post, posts, isLoading are variables from reducers
    const {post, posts, isLoading} = useSelector((state) => state.posts);
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() =>{
        dispatch(getPost(id))
    }, [dispatch, id])

    useEffect(() => {
        if(post) {
            dispatch(getPostsBySearch({search:'none', tags:post?.tags.join(',')}))
        }
    },[dispatch, post])

    if (!post) return null;

    if(isLoading) {
        return(
            <Paper elevation={6}>
                <Load1 />
                </Paper>
        )
    }

    const recommendedPosts = posts.filter(({_id}) => _id !==post._id)
    
    const openPost = (_id) => history.push(`/posts/${_id}`);
    
    return (
        <Paper elevation={6}>
            <div className={classes.postDetail}>
            <div className={classes.text}>
            <Typography variant="h5" style={{fontWeight:"bold"}}>{post.title}</Typography>
            <Typography variant="body2" gutterBottom>{post.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography variant="body2" gutterBottom>{post.message}</Typography>
            <Typography variant="body2" style={{fontWeight:"bold", fontSize:"14px"}}>{`Created by: ${post.name}`}</Typography>
            <Typography variant="body1" style={{fontSize:"12px"}}>{moment(post.createdAt).fromNow()} </Typography>
            <Divider style={{margin:'20px 0'}} />
            <CommentSection post={post}/>
            </div>
            <img  className={classes.imgg} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}/>        

            </div>

            {recommendedPosts.length && (
                <div>
                    <Typography gutterBottom variant='h5'style={{paddingLeft:"5px"}}>You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommend}>
                       {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
                           <div style={{margin:'20px', cursor:'pointer'}} className={classes.post}  onClick={() => openPost(_id)} key={_id}>
                               <Typography variant="h6" style={{fontWeight:"bold"}}>{title}</Typography>
                               <Typography gutterBottom variant="subtitle2" style={{fontWeight:"bold", fontSize:"14px"}}>Created by: {name}</Typography>
                               <Typography gutterBottom variant="subtitle2">{message}</Typography>
                               <Typography gutterBottom variant="subtitle2">Likes: {likes.length}</Typography>
                               <img src={selectedFile} width="300px"/ >
                               </div>
                       ))} 
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetail
