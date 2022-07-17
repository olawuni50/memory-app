import React,{useState, useEffect} from 'react'
import {Grid, Container, Grow, Paper, AppBar, TextField, Button} from "@mui/material"
import {useDispatch} from "react-redux"
import {useHistory, useLocation} from "react-router-dom"
import ChipInput from 'material-ui-chip-input'
import {getPosts, getPostsBySearch} from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from "../Form/Form"
import Paginate from '../Pagination/Pagination'
import {useStyles} from "./styles"



function useQuery(){
    return new URLSearchParams(useLocation().search)
}


const Home = () => {
    const classes = useStyles()

    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const dispatch = useDispatch();
    const history = useHistory()
    const query = useQuery();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    


    // Dispatch an action from action folder(/actions/posts)
    // useEffect(() =>{
    //         dispatch(getPosts())
    // }, [currentId, dispatch])


    const searchPost =()=>{
        if(search.trim()|| tags) {
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else {
            history.push('/')
        }
    }
    

    const handleKeyPress = (e) =>{
        if(e.keyCode === 13){
            // search post
            searchPost()
        }
    }

    const handleAdd = (tag) =>{
         setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

 
    return (
        <Grow in>
            <Container maxWidth = "xl">
            <Grid  container  spacing={3} justify="space-between" alignItems="stretch" className={classes.gridContainer}>

            <Grid item sm={6} xs={12} md={9}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item sm={6} xs={12} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField 
                    name="search"
                    variant="outlined"
                    label="Search Memories"
                    onKeyPress={handleKeyPress}
                    fullWidth
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    />
                    
                    <ChipInput 
                    style={{margin: '10px 0'}}
                    value = {tags} 
                    name="tags"
                    variant="outlined"
                    onAdd={handleAdd} 
                    onDelete={handleDelete} 
                    label="Search Tags" 
                    /> 

                    <Button onClick={searchPost} className={classes.searchButton}
                    color="primary" variant="contained"> Search </Button>

                    </AppBar>

                <Form currentId={currentId} setCurrentId={setCurrentId}/>

                {(!searchQuery && !tags.length) && (
                         <Paper className={classes.pagination} elevation={6}>
                         <Paginate page={page} />
                     </Paper>
                )}
               
            </Grid>

            </Grid>
            </Container>
        </Grow>
    )
}

export default Home
