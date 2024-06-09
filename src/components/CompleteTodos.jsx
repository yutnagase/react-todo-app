import React from "react";

const CompleteTodos = ({ todos, onClick, onClickEdit }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "高":
        return "priority-high";
      case "中":
        return "priority-medium";
      case "低":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="todo-area complete-area">
      <p className="title">完了したこと</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} className="todo-item">
            <span className={`priority ${getPriorityClass(todo.priority)}`}>
              {todo.priority}
            </span>
            <p>{todo.text}</p>
            {todo.dueDate && <span className="due-date">{todo.dueDate}</span>}
            <button className="edit" onClick={() => onClickEdit(todo)}>
              編集
            </button>
            <button onClick={() => onClick(index)}>戻す</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CompleteTodos };
