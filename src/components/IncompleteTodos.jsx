/**
 * 未完了TODOコンポーネント
 */
export const IncompleteTodos = ({ todos, onClickComplete, onClickRemove }) => {
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul id="incomplete-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="list-row">
              <p className="todo-item">{todo.text}</p>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickRemove(index)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
