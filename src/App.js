import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './Components/MovieList';
import SearchBox from './Components/SearchBox';
import MovieListHeading from './Components/MovieListHeading';
import AddFavourites from './Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=3cb1b812`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovieRequest(search);
  }, [search]);


useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);

  };
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};           


    return (
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Movies' />
          <SearchBox search={search} setSearch={setSearch} />
        </div>
        <div className='row'>
          <MovieList movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites} />
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites' />
        </div>
        <div className='row'>
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        </div>
      </div>
    );
  };


  export default App;
