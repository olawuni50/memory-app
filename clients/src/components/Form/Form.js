import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from "react-router-dom";
import {TextField, Button, Typography, Paper} from "@mui/material"
import FileBase from "react-file-base64"
import {createPost, updatePost} from '../../actions/posts'
import {useStyles} from './FormStyles'


const Form = ({currentId, setCurrentId}) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [postData, setPostData] = useState({title:'', message:'', tags: '', selectedFile:''}) 

    // used to populate the value of the post to form when you click on edit button
    const post =  useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null))
    
    const user = JSON.parse(localStorage.getItem('profile'))


    // used to populate the value of the post to form when you click on edit button
        useEffect(() =>{
            if(post) setPostData(post)
        }, [post])


    const submit = (e) =>{
        e.preventDefault()        
        
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}))                  
        }else{
            dispatch(createPost({...postData, name: user?.result?.name}, history))
                        
        }
        clear()              
    }

    
    const clear = () =>{
        setCurrentId(null)
        setPostData({ title:'', message:'', tags: '', selectedFile:''})  
    }

    if(!user?.result?.name){
        return( 
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align='center'>
                    Please Sign in to create your own memories and like other's memories
                </Typography>
            </Paper>
        )
    }

 

    return(
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate onSubmit={submit} className={classes.form}>

                <Typography variant="h6" className={classes.typo} >{currentId ? "Editing": "Creating"} a Memory</Typography>


             <TextField required  className={classes.text} name="title" variant ="outlined" fullWidth label="Title"
            value={postData.title} onChange={(e) =>setPostData({...postData, title: e.target.value})} />


            <TextField required  multiline className={classes.text} rows={4} variant ="outlined" fullWidth
            label="Message" name="message" value={postData.message} onChange={(e) =>setPostData({...postData, message: e.target.value})} />
            

            <TextField required  name="tags" variant ="outlined" fullWidth label="Tags(Coma separated no spacing)" className={classes.text}
            value={postData.tags} onChange={(e) =>setPostData({...postData, tags: e.target.value.split(',')})} />

            {/* <TextField required variant ="outlined" fullWidth name="selectedFile"  className={classes.text}
            value={postData.selectedFile} onChange={(e) =>setPostData({...postData, selectedFile: e.target.value})} type="file"/> */}

        <div className={classes.file}>
        <FileBase type="file" multiple={false} onDone={({base64}) =>setPostData({...postData, selectedFile: base64})}/>

        </div>


            <Button variant="contained" fullWidth className={classes.button} type="submit">
                {currentId ? "Update":"Submit"}</Button>

            <Button variant="contained" color="secondary" fullWidth
            className={classes.button} onClick={clear}>Clear</Button>
            </form>
        </Paper>
        
    )
}

export default Form