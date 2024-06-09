export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickRemove } = props;
  return (
    <>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul id="incomplete-list">
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickRemove(index)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
