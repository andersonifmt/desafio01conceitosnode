const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title, 
    url,
    techs,
    likes:0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const {title, url, techs, likes } = request.body;

  const repositoryID = repositories.findIndex(repo=>repo.id==id);

  if(repositoryID<0){
    return response.status(400).send();
  }

  const mylikes = repositories[repositoryID].likes;
  
  const repository = {
    id,
    url,
    title,
    techs,
    likes: mylikes
  }

  repositories[repositoryID] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const myrepository = repositories.findIndex(repo => repo.id == id);

  if(myrepository<0){
    return response.status(400).json();
  }

  repositories.splice(myrepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repository = repositories.find(repository=>repository.id==id);
    
  if(!repository){
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);
  
});

module.exports = app;
