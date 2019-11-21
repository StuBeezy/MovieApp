import React from 'react';
import { Link } from 'react-router-dom';
import { truncate } from 'lodash';

const Movie = ({ movie }) => {
  const truncatedString = truncate(movie.overview, {
    length: 250,
    separator: ' '
  });
  return (
    <div className="col s4">
      <div className="card horizontal">
        <div className="card-image">
          <Link to={`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}/>
          </Link>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{truncatedString}</p>
          </div>
          <div className="card-action">
            <span>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
