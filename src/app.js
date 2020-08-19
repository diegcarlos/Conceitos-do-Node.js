const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
      ? repositories.filter(repositorie => repositorie.title.includes(title))
      :repositories;

  return response.json(results)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const likes = 0
  
  const repositorie = {id: uuid(), title, url, techs, likes}

  repositories.push(repositorie);

      return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
      return response.status(400).json({erro:"repositories Not Found"});
  }

  

  const repositorie = {
      id,
      title,
      url,
      techs,
      likes
  }
  
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
      return response.status(400).json({erro:"repositorie Not Found"});
  }
  repositories.splice(repositorieIndex, 1)


  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id, likes } = request.params;
  console.log(likes);
});

module.exports = app;
