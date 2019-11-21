import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { isEmpty, get } from 'lodash'

import getSearchMovies from './SearchBar.graphql';
import '../styles/search-bar.scss';

const populateSearchResults = (movies) => {
  if (!isEmpty(movies)) {
    return (
      <ul>
        {movies.map(movie => {
          return (
            <Link to={`/movie/${movie.id}`}>
              <li>{movie.title}</li>
            </Link>
          );
        })}
      </ul>
    );
  }
  return null;
};

const SearchBar = () => {
  const [ queryString, setQuery ] = useState(' ');
  const onKeyPress = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="search-bar">
        <input
          type="search"
          className="search-input"
          onChange={(e) => onKeyPress(e)}
        />
        <Query query={getSearchMovies} variables={{ query: queryString}}>
          {({ loading, error, data}) => {
            if (error) throw Error;
            const movies = get(data, ['search', 'movies'], []);
            return populateSearchResults(movies);
          }}
        </Query>
      </div>
    </div>
  );
};

export default SearchBar;
