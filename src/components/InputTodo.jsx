/**
 * TODO入力コンポーネント
 */
const InputTodo = ({ todoText, onChange, onClick, disabled }) => (
  <div className="input-area">
    <input
      placeholder="TODOを入力"
      value={todoText}
      onChange={onChange}
      disabled={disabled}
    />
    <button onClick={onClick} disabled={disabled}>
      追加
    </button>
  </div>
);

export { InputTodo };
