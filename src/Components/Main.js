import React from 'react';
import { useEffect, useState } from 'react';

import Movie from './Movie';
import Loading from './Loading';
import Mobilemovie from './MobileMovie';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container, Input } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import MenuIcon from '@mui/icons-material/Menu';

import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: "#688f4e"
    },

    secondary: {
      main: "#b1d182"
    }
  }
});


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const TRENDING = "https://api.themoviedb.org/3/trending/movie/day?api_key=04c35731a5ee918f014970082a0088b1"

const NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1"

const POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1"

const DISCOVER_MOVIES = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"

const UPCOMING_MOVIES = "https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1"


const Main = () => {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  // const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");


  const getMovies = (API) => {
    fetch(API) 
    .then((res) => res.json())
    .then((data) => {

      setLoading(false);
      console.log(data);
      setMovies(data.results);
    });
  };

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

 // SEARCH

const handleChange = (e) => {
  setSearchTerm(e.target.value);
}

const clearSearch = (e) => {
  document.getElementById('searchbox').value = '';
  document.getElementById('searchbox').innerText = "";
  goHome();
}

const fetchSearch = (e) => {
  e.preventDefault();

  if (searchTerm) {
    getMovies (SEARCH_API + searchTerm);

    document.getElementById('page-title').innerText = "Search Results";
  }
  setSearchTerm("");


};

const goHome = (e) => {
  getMovies (FEATURED_API);

  document.getElementById('page-title').innerText = "Featured Movies";
}

const nowPlaying = (e) => {
  getMovies(NOW_PLAYING);

  document.getElementById('page-title').innerText = " Now Playing in Theatres";
}

const getTrending = (e) => {
  getMovies(TRENDING);

  document.getElementById('page-title').innerText = "Trending Movies";
}

const popularMovies = (e) => {
  getMovies(POPULAR);

  document.getElementById('page-title').innerText = "Popular Movies";
}

const discoverMovies = (e) => {
  getMovies(DISCOVER_MOVIES);
  document.getElementById('page-title').innerText = "Discover New Movies";
}

const upcomingMovies = (e) => {
  getMovies(UPCOMING_MOVIES);

  document.getElementById('page-title').innerText = "Upcoming Movies";
}

if (loading) {
  return (
    <main>
      <Loading />
    </main>
  );
}

  return (
    <>
      <ThemeProvider theme={theme}>

        <div className='desktop'>
          <div className="header">
          <Container>
            <div className='headercontent'>
              <nav>
                <ul>
                  <li><Button variant="text" color='secondary' onClick={popularMovies}>Popular</Button></li>
                  <li><Button variant="text" color='secondary' onClick={nowPlaying}>Now Playing</Button></li>
                  <li><Button variant="text" color='secondary' onClick={getTrending}>Trending</Button></li>
                  <li><Button variant="text" color='secondary' onClick={upcomingMovies}>Upcoming Movies</Button></li>
                  <li><Button variant="text" color='secondary' onClick={discoverMovies}>Discover Movies</Button></li>
                </ul>
              </nav>
        
                <ButtonGroup size="small" variant="outlined" aria-label="outlined button group" >        
                  
                <Input id='searchbox' sx={{color: "#b1d182", border: 1, borderRadius: 1, letterSpacing: "0.15em", paddingLeft: 1.5 }} size="small"
                onChange={handleChange} onSubmit={fetchSearch}/>

                <Button sx={{color: "#b1d182", border: 1, borderRadius: 1 }} aria-label="delete" endIcon={<BackspaceIcon />} onClick={clearSearch}>
                </Button>

                <Button sx={{color: "#b1d182", border: 1, borderRadius: 1 }}  aria-label="search" 
                endIcon={<SearchIcon />} onClick={fetchSearch}>
                </Button>

              </ButtonGroup>

              
            </div>
          </Container>             
        </div>


      
        <Container>

          <div id='page-title'> </div>
            
          <div className="movie-container">
            {movies.length > 0 && 
            movies.map((movie) => (
            <Movie key={movie.id} {...movie} />
            ))}    
          </div>
        </Container>
        </div>

        <div className='mobile'>
          <Container className='header'>
            <div className='headercontent'>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      <MenuIcon fontSize='small'/>
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={()=>{ popupState.close(); goHome() }}>Home</MenuItem>
                      <MenuItem onClick={()=>{ popupState.close(); nowPlaying() }}>Now Playing</MenuItem>
                      <MenuItem onClick={()=>{ popupState.close(); getTrending() }}>Trending</MenuItem>
                      <MenuItem onClick={()=>{ popupState.close(); popularMovies() }}>Popular Movies</MenuItem>
                      <MenuItem onClick={()=>{ popupState.close(); discoverMovies() }}>Discover Movies</MenuItem>
                      <MenuItem onClick={()=>{ popupState.close(); upcomingMovies() }}>Upcoming Movies</MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>

                <ButtonGroup size="small" variant="outlined" aria-label="outlined button group" >        
                  
                <Input id='searchbox' sx={{color: "#b1d182", border: 1, borderRadius: 1, letterSpacing: "0.15em", paddingLeft: 2 }} size="small"
                onChange={handleChange} onSubmit={fetchSearch}/>

                <Button sx={{color: "#b1d182", border: 1, borderRadius: 1 }}  aria-label="search" 
                endIcon={<SearchIcon />} onClick={fetchSearch}>
                </Button>

                </ButtonGroup>

              

            </div>

          </Container>

          



          <Container>
            <div id='page-title'> </div>
            
            <div className="movie-container">
              {movies.length > 0 && 
              movies.map((movie) => (
              <Mobilemovie key={movie.id} {...movie} />
              ))}    
            </div>
          </Container>

        </div>

      </ThemeProvider>
        
    </>
  )
}

export default Main
