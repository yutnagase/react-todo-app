/**
 * 完了TODOコンポーネント
 */
const CompleteTodos = ({ todos, onClick }) => (
  <div className="todo-area complete-area">
    <p className="title">完了のTODO</p>
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id} className="todo-item">
          <p>{todo.text}</p>
          <button onClick={() => onClick(index)}>戻す</button>
        </li>
      ))}
    </ul>
  </div>
);

export { CompleteTodos };
