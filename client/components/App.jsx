import React from 'react';
import SearchBar from './SearchBar';
import MoviesList from './MoviesList';
import AppHeader from './AppHeader';


const App = () => {
  return (
    <div>
      <AppHeader/>
      <SearchBar/>
      <div>
        <MoviesList/>
      </div>
    </div>
  );
};

export default App;
