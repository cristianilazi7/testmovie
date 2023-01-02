import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Movielist from './components/Movieslist';
import { useCookies } from 'react-cookie';

function App() {
  
  const [movies, setMovies] = useState<any>([]);
  const [cookies, setCookie] = useCookies(['token']);

  const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

  const config = {
    method: 'get',
    url: 'http://localhost:3200/movies',
    headers: { 
      'Authorization': `Bearer ${cookies.token}`
    }
  };

  const getMovieRapi = async ()=> {
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
		getMovieRequest();
    getMovieRapi();
	}, []);


  return (
    <div className='container-fluid movie-app'>
      <h1>Movies:</h1>
			<div className='row'>
        
        <Movielist movies={movies} />
			</div>
		</div>
  );
}

export default App;
