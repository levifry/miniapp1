import express, { json } from 'express';
import db from "./db.js";
import cors from "cors";
import listEndpoints from 'express-list-endpoints'

const server = express()

var corsOptions = {
  origin: ["http://localhost:3000","http://76.174.184.10:3000","http://localhost:1337/","http://76.174.184.10:1337","http://live.levifry.com"],
  optionsSuccessStatus: 200,
  methods: ["GET","POST","DELETE","UPDATE", "PUT", "PATCH"],
  credentials: true,
}

server.use(cors(corsOptions));
server.use(json());

server.get('/api/movies', (req, res) => {
  db("movies")
    .select("*")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(`Error, no movies to return.`)
    })
})

server.get('/api/movies/:title', (req, res) => {
  let { title } = req.params;
  db("movies")
    .where('title', title[0].toUpperCase() + title.slice(1))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(`Error, no movies to return.`)
    })
})

server.post("/api/movies", (req, res) => {
  let movie = {
    title: req.body.title,
    description: req.body.description,
  }
  db('movies')
  .select('*')
  .insert({ // TODO: Update this format
    title: movie.title,
    description: movie.description,
  })
  .then(data => {
    db('movies')
      .select('*')
      .then((newMovieId) => {
        res.status(201).send(newMovieId)
      })
  })
  .catch((error) => {
    res.status(400).send(`Error, movie not added to database.`)
  })
})

server.patch("/api/movies", (req, res) => {
  let movie = {
    title: req.body.title,
    description: req.body.description,
  }
  db("movies")
    .where('title', movie.title)
    .update(movie)
    .returning("*")
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).send(`Error, movie not updated`)
    })
})

server.delete("/api/movies", (req, res) => {
  let title = req.body.title
  db("movies")
    .where('title', title)
    .del()
    .then((newMovieId) => {
      res.status(200).send(`Movie deleted!`)
    })
    .catch((error) => {
      res.status(400).send(`Error, movie not deleted.`)
    })
})

server.all('*', function(req, res){
  console.log(`${req.method } at ${req.path} was rejected`)
  let endpoints = listEndpoints(server)
  endpoints.pop();
  res.status(404).send(endpoints);
});

export default server;