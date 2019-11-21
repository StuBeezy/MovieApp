import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { get, chunk } from 'lodash'
import classNames from 'classnames';

import Movie from './Movies';

import { getPopularMoviesQuery } from './MoviesList.graphql';

import '../styles/pagination.scss';

const renderPaginationButtons = (page, setPage) => {
  const buttons = [
    {
      text: 'Previous',
      isPrevious: true,
      onClick: () => setPage(prevPage => prevPage - 1)
    },
    {
      text: 'Next',
      isNext: true,
      onClick: () => setPage(prevPage => prevPage + 1)
    }
  ];

  return buttons.map(button => {
    const classes = classNames('pag-button', {
      'pag-disabled': button.isPrevious ? page === 1 : page === 500
    });
    return (
      <span className={classes} onClick={button.onClick}>{button.text}</span>
    );
  });

};


const MoviesList = () => {
  const [pageNum, setPage] = useState(1);

  return (
    <Query
      query={getPopularMoviesQuery}
      variables={{ page: pageNum }}
    >
      {({ loading, error, data}) => {
        if (error) throw Error;
        const page = get(data, ['movies', 'page'], 1);
        const totalPages = get(data, ['movies', 'totalPages']);
        const movies = get(data, ['movies', 'movies'], []);
        const moviesChunk = chunk(movies, 3);
        return (
          <div>
            <div className="pagination">
              {renderPaginationButtons(pageNum, setPage)}
              <span className="page-num">{page} out of {totalPages}</span>
            </div>
            {moviesChunk.map(movieChunk => {
              return (
                <div className="row" style={{ display: 'inline-block'}}>
                  {movieChunk.map(movie => {
                    return (
                      <Movie movie={movie}/>
                    );
                  })}
                </div>
              )
            })}
          </div>
        );
      }}
    </Query>
  );
};

export default MoviesList;
