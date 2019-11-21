import React from 'react';
import { Query } from 'react-apollo';
import { get, chunk } from 'lodash';
import classNames from 'classnames';
import { format } from 'date-fns';

import { getMovieDetails } from '../components/MoviesList.graphql';

import AppHeader from './AppHeader';
import '../styles/movie-details.scss';

import noImage from '../public/images/no-image.jpg';


const languageTypes = {
  'en': 'English',
  'fi': 'Finnish',
  'es': 'Spanish',
  'ge': 'German',
  'ru': 'Russian'
};

const timeConvert = (n) => {
  const hours = (n / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return rhours + 'h' + ' ' + rminutes + 'min';
};

const renderCast = (movie) => {
  const castChunks = chunk(movie.cast, 4);
  return (
    <div className="row">
      <div className="col s12">
        <div className="cast-box">
          <p className="header">Cast</p>
          {castChunks.map(castChunk => {
            return (
              <div className="row">
                {castChunk.map(castMember => {
                  const posterImage = castMember.poster ? `https://image.tmdb.org/t/p/w500${castMember.poster}` : noImage;
                  const classes = classNames('actor-name', {
                    'no-actor': !castMember.poster
                  });
                  return (
                    <div className="col s3">
                      <span className="actor-info">
                        <img className="actor-poster" src={posterImage} alt="Insert Photo"/>
                        <p className={classes}>{castMember.actorName}</p>
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} ;

const MoviePage = (props) => {
  const { movie_id } = props.match.params;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <div>
      <AppHeader isAbsolute={true}/>
      <Query
        query={getMovieDetails}
        variables={{ movieId: parseInt(movie_id, 10) }}
      >
        {({ loading, error, data }) => {
          if (error) throw Error;
          if (loading) return <div>Loading...</div>;
          const movie = get(data, ['movie'], {});
          const newDate = new Date(movie.releaseDate).getTime() + (1000*60*60*24);
          const newDateFormat = format(newDate, 'd/MMMM/yyyy');
          const backgroundImage = `
            linear-gradient(to bottom, rgba(16, 21, 16, 0.52) 0%, rgba(169, 170, 167, 0.73) 100%),
            url(https://image.tmdb.org/t/p/w500/${movie.backdrop})
          `;

          return (
            <div className="movie-details">
              <section className="movie-backdrop" style={{ background: backgroundImage}}/>
              <div className="movie-intro">
                <div className="movie-intro-container">
                  <div className="movie-row">
                    <div className="movie-col">
                      <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}/>
                      </div>
                      <div className="movie-title">
                        <h3 className="title">{movie.title}</h3>
                        <ul className="movie-subtext">
                          <li>{timeConvert(movie.runtime)}</li>
                          <li>{newDateFormat}</li>
                          <li>
                            {movie.genres.map(genre => {
                              return genre.name;
                            }).join(', ')}
                          </li>
                        </ul>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s6" style={{ paddingLeft: '70px', marginTop: '50px'}}>
                  <span className="header">Overview</span>
                  <p>{movie.overview}</p>
                </div>
                <div className="col s6" style={{ marginTop: '50px'}}>
                  <div className="movie-details-box">
                    <span className="header">Details</span>
                    <p>Release Date: {newDateFormat}</p>
                    <p>Budget: {formatter.format(movie.budget) + ' USD'}</p>
                    <p>Revenue: {formatter.format(movie.revenue) + ' USD'}</p>
                    <p>Language: {languageTypes[movie.language] || movie.language}</p>
                  </div>
                </div>
              </div>
              {renderCast(movie)}
            </div>
          )
        }}
      </Query>
    </div>
  );
};

export default MoviePage;
