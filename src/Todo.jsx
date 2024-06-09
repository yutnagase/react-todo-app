import { useState } from "react";
import "./Todo.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  /**
   * TODOテキスト変更時処理
   */
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  /**
   * 追加ボタンクリック時処理
   */
  const onClickAdd = () => {
    if (!todoText.trim()) return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  /**
   * 完了ボタンクリック時処理
   */
  const onClickComplete = (index) => {
    const newIncompleteTodos = incompleteTodos.filter((_, i) => i !== index);
    const targetTotoText = incompleteTodos[index];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos([...completeTodos, targetTotoText]);
  };
  /**
   * 削除ボタンクリック時処理
   */
  const onClickRemove = (index) => {
    setIncompleteTodos(incompleteTodos.filter((_, i) => i !== index));
  };
  /**
   * 戻るボタンクリック時処理
   */
  const onClickBack = (index) => {
    // 該当TODOを把握
    const targetTotoText = completeTodos[index];

    // 完了TODOから該当のTODOを削除
    const newCompleteTodos = completeTodos.filter((_, i) => i !== index);
    setCompleteTodos(newCompleteTodos);

    // 該当TODOを未完了TODOに戻す
    setIncompleteTodos([...incompleteTodos, targetTotoText]);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      {/* TODO入力テキストエリア  */}
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
      {/* 未完了TODOエリア  */}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickRemove={onClickRemove}
      />
      {/* 完了TODOエリア  */}
      <CompleteTodos todos={completeTodos} onClick={onClickBack} />
    </>
  );
};
