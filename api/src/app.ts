import express from "express";
import bodyParser from 'body-parser'; 
import AuthRoutes from './routes/auth.route';
import authenticateToken from './helper/middleware';
import MovieSearchRoutes from "./routes/movies.route";
import MoviesRoutes from "./routes/movies.route";

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-headers',
                'Origin, X-Requested-Whith, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//Routes which handling request
app.use('/auth',AuthRoutes);
//app.use('/api/movies/search',authenticateToken,MovieSearchRoutes);
app.use('/movies',authenticateToken,MoviesRoutes);

export default app;