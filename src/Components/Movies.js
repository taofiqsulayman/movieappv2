
import React from 'react';

import { Container } from '@mui/material';
import Movie from './Movie';

const Movies = (movies) => {

  return (

    <Container>
      <div className="movie-container">
        {movies.length > 0 && 
        movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
        ))}    
      </div>
    </Container>
  );
};

export default Movies;


