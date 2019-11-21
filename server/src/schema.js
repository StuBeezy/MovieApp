const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
      movies(page: Int): Page!
      movie(id: Int): Movie!
      search(query: String): Page
  }
  
  type Page {
      page: Int!
      totalPages: Int!
      movies: [Movie]
  }
  
  type Movie {
      id: ID!
      title: String!
      adult: Boolean
      poster: String
      backdrop: String
      overview: String
      budget: Int
      revenue: Int
      language: String
      runtime: String!
      releaseDate: String!
      popularity: Float!
      vote: Float!
      cast: [Actor]
      genres: [Genre]
  }
  
  type Genre {
      id: ID!
      name: String!
  }
  
  type Actor {
      castId: ID!
      actorId: ID!,
      character: String!
      actorName: String!
      poster: String
  }
`;

module.exports = typeDefs;
