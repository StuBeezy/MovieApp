const lodash =  require( 'lodash');
module.exports = {
  Query: {
    movies: async(_, { page }, { dataSources }) => {
      const allMovies = await dataSources.launchAPI.getPopularMovies(page);
      return allMovies;
    },
    movie: async(_, { id }, { dataSources } ) => {
      const movie = await dataSources.launchAPI.getMovieById(id);
      return movie;
    },
    search: async(_, { query }, { dataSources }) => {
      const queryString = lodash.isEmpty(query) ? ' ' : query;
      const searchMovies = await dataSources.launchAPI.getMovieBySearch({ query: queryString });
      return searchMovies;
    }
  },
  Movie: {
    cast: async(movie, { args }, { dataSources }) => {
      const cast = await dataSources.launchAPI.getCastForMovie(movie.id);
      return cast;
    }
  }
};
