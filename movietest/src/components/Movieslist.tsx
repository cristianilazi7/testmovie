import React, { useState, useEffect } from 'react';
import '../css/style.css';
const Movielist = (props: { movies: any[]; }) => {
    const initPathUrl = 'https://image.tmdb.org/t/p/w500/'
    return (
        <>
            {props.movies.map((movie, index)=> (
                <div key={index} className='image-container d-flex justify-content-start-movie m-3'>
                    <img  src={initPathUrl + movie.poster_path} alt='movie'></img>
                </div>
            ))}
        </>
    );
};

export default Movielist;