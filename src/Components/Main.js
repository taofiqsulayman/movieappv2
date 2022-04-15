import React from 'react';
import { useEffect, useState } from 'react';

import Movie from './Movie';
import Loading from './Loading';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container, Input } from '@mui/material';


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
  goHome();
}

const fetchSearch = (e) => {
  e.preventDefault();

  if (searchTerm) {
    getMovies (SEARCH_API + searchTerm);
  }
  setSearchTerm("");
};

const goHome = (e) => {
  getMovies (FEATURED_API);
}

const nowPlaying = (e) => {
  getMovies(NOW_PLAYING);
}

const getTrending = (e) => {
  getMovies(TRENDING);
}

const popularMovies = (e) => {
  getMovies(POPULAR);
}

const discoverMovies = (e) => {
  getMovies(DISCOVER_MOVIES);
}

const upcomingMovies = (e) => {
  getMovies(UPCOMING_MOVIES);
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
        <div className="header">
        <nav>
          <ul>
            <li><a href="#" onClick={popularMovies}>Popular</a></li>
            <li><a href="#" onClick={nowPlaying}>Now Playing</a></li>
            <li><a href="#" onClick={getTrending}>Trending</a></li>
            <li><a href="#" onClick={upcomingMovies}>Upcoming Movies</a></li>
            <li><a href="#" onClick={discoverMovies}>Discover Movies</a></li>
          </ul>
        </nav>

        <ButtonGroup size="small" variant="outlined" aria-label="outlined button group" >        
              
              <Input sx={{color: "#b1d182", border: 1, borderRadius: 1 }} size="small" id='searchbox' 
              onChange={handleChange} onSubmit={fetchSearch}/>

              <Button sx={{color: "#b1d182", border: 1, borderRadius: 1 }} aria-label="delete" endIcon={<BackspaceIcon />} onClick={clearSearch}>
              </Button>

              <Button sx={{color: "#b1d182", border: 1, borderRadius: 1 }}  aria-label="search" 
              endIcon={<SearchIcon />} onClick={fetchSearch}>
              </Button>

            </ButtonGroup>
      </div>
      

        <div className="movie-container">
        {movies.length > 0 && 
        movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
        ))}    
      </div>
      

    </>
  )
}

export default Main
