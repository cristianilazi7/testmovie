import express from 'express';
import { Request, Response } from "express";
import { environment } from '../../environments/environment';
import axios from 'axios';
const MovieSearchRoutes = express.Router();
// Defined get data(index or listing) route

  MovieSearchRoutes.route('/:moviename').get(async function (req: Request, res: Response) {

    console.log('Entro a buscar: ', req.params); 

  const moviename = req.params.moviename;
  const url = `${environment.urlMoviedb}/search/movie?query=${moviename}&sort_by=popularity.desc&api_key=${environment.apikey}&language=es`;
  
  let promise = new Promise(async function(resolve, reject) {
    await axios.get(url)
    .then(function (response) {
        // handle success
        //console.log(response.data);
        resolve(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        reject(new Error(JSON.stringify({msg: error})));
    })
    .finally(function () {
        // always executed
    });
  });
  promise.then((result) => {
      console.log("Success", result);
      res.status(200).json({'data':result, 'result': 'successfully','status':200});
  }).catch((error) => {
      console.log("Error search", error);
      res.status(200).json({'data':error, 'result': 'Error search','status':200});
  })
  
});



export default MovieSearchRoutes;