/**
 * 完了TODOコンポーネント
 */
export const CompleteTodos = ({ todos, onClick }) => {
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul id="complete-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="list-row">
              <p className="todo-item">{todo.text}</p>
              <button onClick={() => onClick(index)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
