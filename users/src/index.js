import express from 'express';
// const express = require('express');

const app = express();
const port = 3333

app.use(express.json());

let users = []

// Listar usuários
app.get("/", (request, response) => {
  if (users.length === 0) {
    return response.status(404).json({
      mensagem: "Nenhum usuário encontrado"
    })
  }

  response.json(users)
})

// Criar usuário
app.post("/users", (request, response) => {
  // const name = request.body.name;
  const { name } = request.body

  if (!name) {
    return response.status(400).json({
      message: "Nome de usuário é obrigatório"
    })
  }

  const newUser = {
    id: users.length + 1,
    name
  }

  users.push(newUser)

  response.status(201).json({
    message: "Usuário cadastrado com sucesso", user: newUser
  })
})

// Alterar usuário
app.put("/users/:id", (request, response) => {
  // const id = request.params.id;
  const { id } = request.params

  // const updatedName = request.body.name
  const { name: updatedName } = request.body

  const user = users.find(user => user.id === Number(id));

  user.name = updatedName;

  if (!user) {
    return response.status(404).json({
      message: "Usuário não encontrado."
    })
  }

  return response.status(200).json({
    message: "Usuário Alterado com sucesso", user
  })
})

// Excluir usuário
app.delete("/users/:id", (request, response) => {
  // const id = request.params.id;
  const { id } = request.params;

  const userIndex = users.findIndex(user => user.id === Number(id))

  if (userIndex === -1) {
    return response.status(404).json({
      message: "Usuário não encontrado"
    })
  }

  const deletedUser = users.splice(userIndex, 1)

  response.status(200).json({
    message: "Usuário excluído com sucesso.", user: deletedUser
  })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));