import React, { useState, useEffect } from 'react';
import '../css/style.css';
const Movielist = (props: { movies: any[], favouriteComponent: any, handleFavouritesClick: any }) => {
    const initPathUrl = 'https://image.tmdb.org/t/p/w500/'
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.map((movie, index)=> (
                <div key={index} className='image-container d-flex justify-content-start-movie m-3'>
                    <img  src={initPathUrl + movie.poster_path} alt='movie'></img>
                    <div 
                    onClick={() => props.handleFavouritesClick(movie)}
                     className='overlay d-flex align-items-center justify-content-center'>
                    <FavouriteComponent />
					</div>
                </div>
            ))}
        </>
    );
};

export default Movielist;