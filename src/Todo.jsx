import { useState, useEffect } from "react";
import axios from "axios";
import "./css/Todo.css";

import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { EditTodoModal } from "./components/EditTodoModal";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");
  const [todoPriority, setTodoPriority] = useState("中");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoText, setEditTodoText] = useState("");
  const [editTodoDueDate, setEditTodoDueDate] = useState("");
  const [editTodoPriority, setEditTodoPriority] = useState("中");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos");
      const todos = response.data;
      setIncompleteTodos(todos.filter((todo) => !todo.completed));
      setCompleteTodos(todos.filter((todo) => todo.completed));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!todoText.trim()) return;
    const newTodo = {
      text: todoText,
      dueDate: todoDueDate,
      priority: todoPriority,
      completed: false,
    };
    try {
      await axios.post("http://localhost:8000/todos", newTodo);
      setTodoText("");
      setTodoDueDate("");
      setTodoPriority("中");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async () => {
    if (!editTodoText.trim()) return;
    const updatedTodo = {
      ...currentTodo,
      text: editTodoText,
      dueDate: editTodoDueDate,
      priority: editTodoPriority,
    };
    try {
      await axios.put(
        `http://localhost:8000/todos/${currentTodo.id}`,
        updatedTodo
      );
      setEditTodoText("");
      setEditTodoDueDate("");
      setEditTodoPriority("中");
      setIsEditing(false);
      setCurrentTodo({});
      setIsModalOpen(false);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const completeTodo = async (index) => {
    const todo = incompleteTodos[index];
    const updatedTodo = { ...todo, completed: true };
    try {
      await axios.put(`http://localhost:8000/todos/${todo.id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const removeTodo = async (index, completed = false) => {
    const todo = completed ? completeTodos[index] : incompleteTodos[index];
    try {
      await axios.delete(`http://localhost:8000/todos/${todo.id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const backToIncomplete = async (index) => {
    const todo = completeTodos[index];
    const updatedTodo = { ...todo, completed: false };
    try {
      await axios.put(`http://localhost:8000/todos/${todo.id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error moving todo back to incomplete:", error);
    }
  };

  const editTodo = (todo) => {
    setEditTodoText(todo.text);
    setEditTodoDueDate(todo.dueDate);
    setEditTodoPriority(todo.priority);
    setIsEditing(true);
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <div className="todo-container">
      <h1 className="title">TODOリスト</h1>
      <InputTodo
        todoText={todoText}
        todoDueDate={todoDueDate}
        todoPriority={todoPriority}
        onChangeText={(e) => setTodoText(e.target.value)}
        onChangeDueDate={(e) => setTodoDueDate(e.target.value)}
        onChangePriority={(e) => setTodoPriority(e.target.value)}
        onClick={isEditing ? updateTodo : addTodo}
        disabled={isMaxLimitIncompleteTodos}
        isEditing={isEditing}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです。</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={completeTodo}
        onClickRemove={removeTodo}
        onClickEdit={editTodo}
      />
      <CompleteTodos
        todos={completeTodos}
        onClick={backToIncomplete}
        onClickEdit={editTodo}
      />
      <EditTodoModal
        isOpen={isModalOpen}
        todoText={editTodoText}
        todoDueDate={editTodoDueDate}
        todoPriority={editTodoPriority}
        onChangeText={(e) => setEditTodoText(e.target.value)}
        onChangeDueDate={(e) => setEditTodoDueDate(e.target.value)}
        onChangePriority={(e) => setEditTodoPriority(e.target.value)}
        onSave={updateTodo}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
