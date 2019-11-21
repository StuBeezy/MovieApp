const { RESTDataSource } = require('apollo-datasource-rest');

function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    adult: movie.adult,
    poster: movie.poster_path,
    backdrop: movie.backdrop_path,
    budget: movie.budget,
    revenue: movie.revenue,
    language: movie.original_language,
    runtime: movie.runtime,
    overview: movie.overview,
    popularity: movie.popularity,
    vote: movie.vote_average,
    releaseDate: movie.release_date,
    genres: movie.genres

  }
}

function formatActor(actor) {
  return {
    castId: actor.cast_id,
    character: actor.character,
    actorName: actor.name,
    actorId: actor.id,
    poster: actor.profile_path
  }
}

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
    this.apiKey = ''; // Grab your own API key from MovieDB API
  }

  async getPopularMovies(page) {
    const response = await this.get('/movie/popular', {
      api_key: this.apiKey,
      page: page || 1
    });
    return {
      page: response.page,
      totalPages: response.total_pages,
      movies: response.results.map(formatMovie)
    };
  }

  async getMovieBySearch({ query, page, }) {
    const response = await this.get('/search/movie', {
      api_key: this.apiKey,
      page: page || 1,
      query: query || ''
    });

    return {
      page: response.page,
      totalPages: response.total_pages,
      movies: response.results.map(formatMovie)
    };
  }

  async getMovieById(movieID) {
    const response = await this.get(`/movie/${movieID}`, {
      api_key: this.apiKey,
    });
    return formatMovie(response);
  }

  async getCastForMovie(movieID) {
    const response = await this.get(`/movie/${movieID}/credits`, {
      api_key: this.apiKey
    });

    return response.cast.map(formatActor);
  }
}

module.exports = LaunchAPI;
