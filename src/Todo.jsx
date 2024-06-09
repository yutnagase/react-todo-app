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
    const response = await axios.get("http://localhost:8000/todos");
    const todos = response.data;
    setIncompleteTodos(todos.filter((todo) => !todo.completed));
    setCompleteTodos(todos.filter((todo) => todo.completed));
  };

  /**
   * ロード時DB読込処理
   */
  useEffect(() => {
    fetchTodos();
  }, []);

  /**
   * TODOテキスト変更時処理
   */
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  /**
   * 追加ボタン押下処理
   */
  const onClickAdd = async () => {
    if (!todoText.trim()) return;
    const newTodo = { text: todoText, completed: false };
    await axios.post("http://localhost:8000/todos", newTodo);
    setTodoText("");
    fetchTodos();
  };

  /**
   * 完了ボタン押下処理
   */
  const onClickComplete = async (index) => {
    const todo = incompleteTodos[index];
    await axios.patch(`http://localhost:8000/todos/${todo.id}`, {
      completed: true,
    });
    fetchTodos();
  };

  /**
   * 削除ボタン押下処理
   */
  const onClickRemove = async (index) => {
    const todo = incompleteTodos[index];
    await axios.delete(`http://localhost:8000/todos/${todo.id}`);
    fetchTodos();
  };

  /**
   * 戻すボタン押下処理
   */
  const onClickBack = async (index) => {
    const todo = completeTodos[index];
    await axios.patch(`http://localhost:8000/todos/${todo.id}`, {
      completed: false,
    });
    fetchTodos();
  };

  /** TODO最大表示件数オーバー判定 */
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red" }}>
          最大登録数は5件です。TODOを消化してください。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickRemove={onClickRemove}
      />
      <CompleteTodos todos={completeTodos} onClick={onClickBack} />
    </>
  );
};
