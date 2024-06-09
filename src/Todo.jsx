import { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const Todo = () => {
  // state管理
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  /**
   * DBレコード取得
   */
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

  /**
   * ロード時DB読込処理
   */
  useEffect(() => {
    fetchTodos();
  }, []);

  /**
   * 追加ボタン押下処理
   */
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

  /**
   * 完了ボタン押下処理
   */
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

  /**
   * 削除ボタン押下処理
   */
  const removeTodo = async (index, completed = false) => {
    const todo = completed ? completeTodos[index] : incompleteTodos[index];
    try {
      await axios.delete(`http://localhost:8000/todos/${todo.id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  /**
   * 戻すボタン押下処理
   */
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

  /** TODO最大表示件数オーバー判定 */
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <div className="todo-container">
      <p className="title">TODO List</p>
      <InputTodo
        todoText={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onClick={addTodo}
        disabled={isMaxLimitIncompleteTodos}
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
        />
        <CompleteTodos
          todos={completeTodos}
          onClick={(index) => backToIncomplete(index)}
        />
      </div>
    </div>
  );
};
