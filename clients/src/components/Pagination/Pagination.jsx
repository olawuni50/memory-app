import React, {useEffect} from 'react'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { useStyles } from './styles'
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom'

import {getPosts} from '../../actions/posts'

 
const Paginate = ({page}) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const {numberOfPages} = useSelector((state) => state.posts)

    useEffect(() =>{
    if(page) {
        dispatch(getPosts(page))  
    } 
    }, [dispatch, page])
    
    return(
         <Pagination classes = {{ur:classes.ul}} count={numberOfPages}
         page={Number(page) || 1} variant="outlined" color="primary" 
         renderItem={(item) => (
             <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
         )}
         />
    )
}

export default Paginate