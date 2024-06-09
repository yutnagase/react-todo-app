export const CompleteTodos = (props) => {
  const { todos, onClick } = props;
  return (
    <>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul id="complete-list">
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClick(index)}>戻す</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
