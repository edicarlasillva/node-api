// const express = require('express');
import express from "express"
import { v4 as uuidv4 } from 'uuid';
const tasks = [
  {
    id: uuidv4(),
    title: "Tasks primaria",
    description: "descriçao primaria",
  }
]

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  if (tasks.length == 0) {
    return response.status(404).json({
      message: "Nenhuma tarefa foi encontrada"
    })
  }
  response.json(tasks)
})
app.post("/tasks", (request, response) => {
  const { title, description } = request.body;

  const newTask = {
    id: uuidv4(),
    title,
    description
  }
  if (!title) {
    return response.status(400).json({
      message: "adicionar titulo"
    })

  }

  tasks.push(newTask);
  return response.status(200).json({
    message: "Tarefa adicionada com sucesso"
  })
})

app.put("/tasks/:id", (request, response) => {
  const { id } = request.params
  const task = tasks.find(task => task.id === id)

  if (!task) {
    return response.status(404).json({
      message: "Tarefa não encontrada!"
    })
  }
  task.title = request.body
  task.description = request.body
  response.status(200).json({
    message: "Tarefa alterada com sucesso!"
  })
})

app.delete("/tasks/:id", (request, response) => {
  const id = request.params.id;

  const taskIndex = tasks.findIndex(task => task.id == id)

  if (taskIndex === -1) {
    return response.status(404).json({
      message: "Task não encontrada"
    })

  }
  const taskDelete = tasks.splice(taskIndex, 1)
  response.status(200).json({
    message: "Task deletada com sucesso", task: taskDelete
  })

})

app.listen(3333, () => console.log("Porta Abrida 3333"));
