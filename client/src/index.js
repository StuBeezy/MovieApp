import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Route, Link, HashRouter as Router } from 'react-router-dom'

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
    cache,
    link
});

import App from '../components/App';
import MoviePage from '../components/MoviePage';


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/movie/:movie_id" component={MoviePage}/>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
