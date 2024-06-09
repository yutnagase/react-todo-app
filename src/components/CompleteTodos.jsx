const CompleteTodos = ({ todos, onClick, onClickEdit }) => (
  <div className="todo-area complete-area">
    <p className="title">完了のTODO</p>
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id} className="todo-item">
          <p>
            {todo.text} - {todo.dueDate} - {todo.priority}
          </p>
          <button className="edit" onClick={() => onClickEdit(todo)}>
            編集
          </button>
          <button onClick={() => onClick(index)}>戻す</button>
        </li>
      ))}
    </ul>
  </div>
);

export { CompleteTodos };
