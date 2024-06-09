import { useState, useEffect } from "react";
import axios from "axios";
import "./css/Todo.css";

import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { EditTodoModal } from "./components/EditTodoModal";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoText, setEditTodoText] = useState("");
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
    const newTodo = { text: todoText, completed: false };
    try {
      await axios.post("http://localhost:8000/todos", newTodo);
      setTodoText("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async () => {
    if (!editTodoText.trim()) return; // 編集用のTODOテキストをチェック
    const updatedTodo = { ...currentTodo, text: editTodoText }; // 編集用のTODOテキストを使用
    try {
      await axios.put(
        `http://localhost:8000/todos/${currentTodo.id}`,
        updatedTodo
      );
      setEditTodoText(""); // 編集用のTODOテキストをクリア
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
    setEditTodoText(todo.text); // 編集用のTODOテキストをセット
    setIsEditing(true);
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <div className="todo-container">
      <p className="title">TODO List</p>
      <InputTodo
        todoText={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onClick={isEditing ? updateTodo : addTodo}
        disabled={isMaxLimitIncompleteTodos}
        isEditing={isEditing}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red" }}>
          最大登録数は5件です。TODOを消化してください。
        </p>
      )}
      <div className="todo-list">
        <IncompleteTodos
          todos={incompleteTodos}
          onClickComplete={completeTodo}
          onClickRemove={(index) => removeTodo(index, false)}
          onClickEdit={editTodo}
        />
        <CompleteTodos
          todos={completeTodos}
          onClick={(index) => backToIncomplete(index)}
          onClickEdit={editTodo}
        />
      </div>
      <EditTodoModal
        isOpen={isModalOpen}
        todoText={editTodoText} // 編集用のTODOテキストを渡す
        onChange={(e) => setEditTodoText(e.target.value)} // 編集用のTODOテキストを更新する関数を渡す
        onSave={updateTodo}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
