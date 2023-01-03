import express from 'express';
import { Request, Response } from "express";
import moment from 'moment';
import { environment } from '../../environments/environment';
import axios from 'axios';
const MoviesRoutes = express.Router();
const from = moment(Date.now()).format('YYYY-MM-DD');
const to = moment(new Date().setDate(new Date().getDate() + 7)).format('YYYY-MM-DD');
// Defined get data(index or listing) route
MoviesRoutes.route('/').get(async function (_req: Request, res: Response) {
    
    const url = `${environment.urlMoviedb}/discover/movie?primary_release_date.gte=${from}&primary_release_date.lte=${to}&api_key=${environment.apikey}&${environment.language}`;
    
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
        //console.log("Success", result);
        console.log("Success");
        res.status(200).json({'data':result, 'result': 'successfully','status':200});
    }).catch((error) => {
        console.log("Error", error);
        res.status(400).json({'data':error, 'result': 'Error not','status':400});
    })
   
    
  });

MoviesRoutes.route('/:id').get(async function (req: Request, res: Response) {
    console.log('Entro id: ', req.params);
      const id = req.params.id;
    const url = `${environment.urlMoviedb}/movie/${id}?api_key=${environment.apikey}&${environment.language}`;
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
       // console.log("Success", result);
        res.status(200).json({'data':result, 'result': 'successfully','status':200});
    }).catch((error) => {
        console.log("Error", error);
        res.status(200).json({'data':error, 'result': 'Error id','status':200});
    })
    
  });


export default MoviesRoutes;