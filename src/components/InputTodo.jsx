const InputTodo = ({
  todoText,
  todoDueDate,
  todoPriority,
  onChangeText,
  onChangeDueDate,
  onChangePriority,
  onClick,
  disabled,
  isEditing,
}) => (
  <div className="input-area">
    <input
      placeholder="TODOを入力"
      value={todoText}
      onChange={onChangeText}
      disabled={disabled}
    />
    <input
      type="date"
      value={todoDueDate}
      onChange={onChangeDueDate}
      disabled={disabled}
    />
    <select
      value={todoPriority}
      onChange={onChangePriority}
      disabled={disabled}
    >
      <option value="高">高</option>
      <option value="中">中</option>
      <option value="低">低</option>
    </select>
    <button onClick={onClick} disabled={disabled}>
      {isEditing ? "更新" : "追加"}
    </button>
  </div>
);

export { InputTodo };
