import React from "react"
import './App.css'
import NavBar from "./components/NavBar/NavBar"
import Home from "./components/Home/Home"
import PostDetail from "./components/PostDetails/PostDetail"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Auth from "./components/Auth/Auth"
import {Container} from "@mui/material"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

const theme = createTheme({
    typography: {
      fontFamily: [
        'Alegreya Sans',
        'sans-serif'
      ].join(','),
      textTransform:"none"
    },
    button:{
      textTransform:"none"
    }
  })


const App = () =>{  
    const user = JSON.parse(localStorage.getItem('profile'))

    return(
        <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Container maxWidth="xl">
             <NavBar/> 
             <Switch>
                 <Route path="/" exact component={() => <Redirect to="/posts" />} />
                 <Route path="/posts" exact component={Home} />
                 <Route path="/posts/search" exact component={Home} />
                 <Route path="/posts/:id" exact component={PostDetail} />
                 <Route path="/auth" component={() =>(!user ? <Auth /> : <Redirect to="/posts" />)}/>
             </Switch>
                     
           </Container>
           </BrowserRouter>
           </ThemeProvider>
    )
}

export default App