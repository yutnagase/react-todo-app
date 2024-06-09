const InputTodo = ({ todoText, onChange, onClick, disabled, isEditing }) => (
  <div className="input-area">
    <input
      placeholder="TODOを入力"
      value={todoText}
      onChange={onChange}
      disabled={disabled}
    />
    <button onClick={onClick} disabled={disabled}>
      {isEditing ? "更新" : "追加"}
    </button>
  </div>
);

export { InputTodo };
