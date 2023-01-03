import express from "express";
import bodyParser from 'body-parser'; 
import AuthRoutes from './routes/auth.route';
import authenticateToken from './helper/middleware';
import MovieSearchRoutes from "./routes/search.route";
import MoviesRoutes from "./routes/movies.route";

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.params);
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
app.use('/movies/search',authenticateToken,MovieSearchRoutes);
app.use('/movies',authenticateToken,MoviesRoutes);

app.use((_req, _res, next) => {
    const error:any = new Error('Not found DDD');
    error.status = 404;
    next(error);
});

app.use((error: { status: any; message: any; }, req: any, res: { status: (arg0: any) => void; json: (arg0: { error: { message: any; }; }) => void; }, next: any) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

export default app;