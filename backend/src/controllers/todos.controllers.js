import { database } from "../db/database.js";
import { createTask, deleteTask, updateTask } from "../models/todos.model.js";

export const getAllTodosCtrl = (req, res) => {
  console.log(req.user.id);
  const todos = database.todos.filter((todo) => todo.owner === req.user.id)
  res.json({ todos });
};

export const createTodoCtrl = (req, res) => {
  const { title, completed } = req.body;
  const owner = req.user.id;
  const newTodo = createTask(title, completed, owner)

  res.json({newTodo})
}

export const deleteTodoCtrl = (req, res) => {
  const {id}= req.params;
  const deleteTodo = deleteTask(id);
  if (deleteTodo) {
    res.json({deleteTodo})
  } else {
    res.status(404).json({message:"tarea no encontrada"})
  }
}

export const updateTodoCtrl = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const owner = req.user.id;
  const updatedTodo = updateTask(id, title, completed, owner);
  if (updatedTodo) {
    res.json({ updatedTodo });
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
  
}