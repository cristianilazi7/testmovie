import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Movielist from './components/Movieslist';
import { useCookies } from 'react-cookie';
import Movielistheading from './components/Movielistheading';
import SearchBox from './components/SearchBox';
import Addfavourites from './components/Addtofavourites'
import Removefavourites from './components/RemoveFavourites';

function App() {
  
  const [movies, setMovies] = useState<any>([]);
  const [cookies] = useCookies(['token']);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState<any>([]);

  const getMovieRequest = async (searchValue: string) => {
    config.url = `http://localhost:3200/movies/search/${searchValue}`;
		await axios(config)
                    .then(response => {
                       // console.log(response.data.data.results);
                        let cleanmovies: any[] = [];
                        response.data.data.results.map((movie: any) => {
                            if (movie.poster_path) {
                              cleanmovies.push(movie);
                            }
                          });
                        
                        console.log('movies:',cleanmovies);
                        setMovies(cleanmovies);
                        //return response;
                    })
                    .catch(error => {
                        console.log(error)
                    });
	};

  let config = {
    method: 'get',
    url: 'http://localhost:3200/movies',
    headers: { 
      'Authorization': `Bearer ${cookies.token}`
    }
  };

  function onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }
  
  const addFavouriteMovie = (movie: any) => {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList.filter(onlyUnique));

  }

  const removeFavouriteMovie = (movie: any) => {
      const newFavouriteList = favourites.filter((favourite: any) => favourite.id !== movie.id);
      setFavourites(newFavouriteList);
  }


  const getMovieRapi = async ()=> {
    config.url = 'http://localhost:3200/movies';
                  await axios(config)
                    .then(response => {
                       // console.log(response.data.data.results);
                        let cleanmovies: any[] = [];
                        response.data.data.results.map((movie: any) => {
                            if (movie.poster_path) {
                              cleanmovies.push(movie);
                            }
                          });
                        
                        //console.log('movies:',cleanmovies);
                        setMovies(cleanmovies);
                        //return response;
                    })
                    .catch(error => {
                        console.log(error)
                    });
    }

  useEffect(() => {
    getMovieRapi();
		getMovieRequest(searchValue);
	}, [searchValue]);


  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<Movielistheading heading='Movies' ></Movielistheading>
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
        
        <Movielist movies={movies} 
                  favouriteComponent={Addfavourites} 
                  handleFavouritesClick = {addFavouriteMovie}
                  />
			</div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
				<Movielistheading heading='Favourites' />
			</div>
      <div className='row'>
				<Movielist movies={favourites} 
                  favouriteComponent={Removefavourites} 
                  handleFavouritesClick = {removeFavouriteMovie} />
			</div>

		</div>
  );
}

export default App;
