const IncompleteTodos = ({
  todos,
  onClickComplete,
  onClickRemove,
  onClickEdit,
}) => (
  <div className="todo-area">
    <p className="title">未完了のTODO</p>
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id} className="todo-item">
          <p>{todo.text}</p>
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

export { IncompleteTodos };
