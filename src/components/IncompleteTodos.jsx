import React from "react";

const IncompleteTodos = ({
  todos,
  onClickComplete,
  onClickRemove,
  onClickEdit,
}) => {
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
    <div className="todo-area">
      <p className="title">やること</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} className="todo-item">
            <span className={`priority ${getPriorityClass(todo.priority)}`}>
              {todo.priority}
            </span>
            <p>{todo.text}</p>
            {todo.dueDate && <span className="due-date">{todo.dueDate}</span>}
            <button className="complete" onClick={() => onClickComplete(index)}>
              完了
            </button>
            <button className="edit" onClick={() => onClickEdit(todo)}>
              編集
            </button>
            <button className="remove" onClick={() => onClickRemove(index)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { IncompleteTodos };
