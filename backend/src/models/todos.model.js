import { database } from "../db/database.js";

export const createTask = (title, completed, owner) => {
    const lastId = database.todos.length > 0 ? Math.max(...database.todos.map(todo => todo.id)) : 0;

    const newTodo = {
        id: lastId + 1,
        title: title.trim(),
        completed,
        owner
    }

    database.todos.push(newTodo);
    return newTodo;
}

export const updateTask = (id, title, completed, owner) => {
    const todo = database.todos.find((todo) => todo.id === +id);
    if (todo) {
        todo.title = title.trim();
        todo.completed = completed;
        todo.owner = owner;
        return todo;
    } else {
        console.log("Tarea no encontrada");
        return null;
    }
}

export const deleteTask = (id) => {
    const todoIndex = database.todos.findIndex((todo) => todo.id === +id)
    if (todoIndex !== -1 ) {
        const deleteTodo = database.todos.splice(todoIndex, 1);
        return deleteTodo[0];
    } else {
        console.log("Tarea no encontrada");
        return null;
    }
}