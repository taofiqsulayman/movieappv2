import React from 'react';
import { useEffect, useState } from 'react';

import Movie from './Movie';
import Loading from './Loading';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import { AppBar, Container, InputBase, Typography, styled, Toolbar, Box, InputAdornment, List, ListItem, Drawer, Divider } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: "#020f14"
    },

    secondary: {
      main: "#ffffff"
    },

    other: {
      main: "#ffd300"
    }
  },

  components: {
    MuiTab: {
      styleOverrides: {
        root:{
          "&.Mui-selected": {
            backgroundColor: "#ffffff",
            color: '#020f14',
            borderRadius: "10px"
          }
        }
      }
    }
  }

});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Categories = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "5px",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 5px",
  borderRadius: theme.shape.borderRadius,
  width: "30%",
  display: "flex",
  alignItems: "center",
  gap: "2px"
}));


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
  const [open, setOpen] = React.useState(false);
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

    document.getElementById('page-title').innerText = `Search Results for ${searchTerm}`;
  }
  setSearchTerm("");


};

const goHome = (e) => {
  getMovies (FEATURED_API);

  document.getElementById('searchbox').value = '';
  document.getElementById('page-title').innerText = "";
}

const nowPlaying = (e) => {
  getMovies(NOW_PLAYING);

  document.getElementById('page-title').innerText = " Now Playing in Theatres";
  document.getElementById('searchbox').value = '';
}

const getTrending = (e) => {
  getMovies(TRENDING);

  document.getElementById('page-title').innerText = "Trending Movies";
  document.getElementById('searchbox').value = '';
}

const popularMovies = (e) => {
  getMovies(POPULAR);

  document.getElementById('page-title').innerText = "Popular Movies";
  document.getElementById('searchbox').value = '';
}

const discoverMovies = (e) => {
  getMovies(DISCOVER_MOVIES);
  document.getElementById('page-title').innerText = "Discover New Movies";
  document.getElementById('searchbox').value = '';
}

const upcomingMovies = (e) => {
  getMovies(UPCOMING_MOVIES);

  document.getElementById('page-title').innerText = "Upcoming Movies";
  document.getElementById('searchbox').value = '';
}


const list = () => (
  <List>
    <ListItem onClick={()=>{ setOpen(false); goHome() }}>Home</ListItem>
    <Divider/>
    <ListItem onClick={()=>{ setOpen(false); nowPlaying() }}>Now Playing</ListItem>
    <Divider/>
    <ListItem onClick={()=>{ setOpen(false); getTrending() }}>Trending</ListItem>
    <Divider/>
    <ListItem onClick={()=>{ setOpen(false); popularMovies() }}>Popular Movies</ListItem>
    <Divider/>
    <ListItem onClick={()=>{ setOpen(false); discoverMovies() }}>Discover Movies</ListItem>
    <Divider/>
    <ListItem onClick={()=>{ setOpen(false); upcomingMovies() }}>Upcoming Movies</ListItem>
    <Divider/>
  </List>
)


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

        <Container maxWidth="xl">
          <AppBar position="sticky">
            <StyledToolbar>
              <Button color='secondary' variant="text" sx={{ display: { xs: "none", sm: "block" } }} onClick={goHome}>
                <Typography variant='h6'>MOVIES</Typography>
              </Button>
              {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}> MOVIES </Typography> */}
              <HomeIcon  onClick={goHome} sx={{ display: { xs: "block", sm: "none" } }} />

              <Categories>
                <Button variant="text" color='secondary' onClick={popularMovies}>Popular</Button>
                <Button variant="text" color='secondary' onClick={nowPlaying}>Now Playing</Button>
                <Button variant="text" color='secondary' onClick={getTrending}>Trending</Button>
                <Button variant="text" color='secondary' onClick={upcomingMovies}>Upcoming Movies</Button>
                <Button variant="text" color='secondary' onClick={discoverMovies}>Discover Movies</Button>
              </Categories>

              <Search>
                <InputBase fullWidth sx={{letterSpacing: "0.2em"}} id='searchbox' onChange={handleChange} onSubmit={fetchSearch} placeholder="search..."
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'secondary' }} onClick={fetchSearch}/>
                  </InputAdornment>
                }
                />
                  {/* <SearchIcon sx={{ color: 'secondary' }} onClick={fetchSearch} />
                  <BackspaceIcon onClick={clearSearch} /> */}
              </Search>

              <UserBox onClick={(e) => setOpen(true)}>
                <MenuIcon />
              </UserBox>

            </StyledToolbar>
            <Drawer
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              sx={{backgroundColor:"transparent"}}
              anchor='right'
              open={open}
              onClose={(e) => setOpen(false)}
            >
              {list()}
            </Drawer>
          </AppBar>

          <div id='page-title'> </div>
            
          <div className="movie-container">
            {movies.length > 0 && 
            movies.map((movie) => (
            <Movie key={movie.id} {...movie} />
            ))}    
          </div>

        </Container>

      </ThemeProvider>
        
    </>
  )
}

export default Main
