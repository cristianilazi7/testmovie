import http from 'http';
import  app  from './app';

const port = process.env.PORT || 3200;
const server = http.createServer(app);

server.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
  });