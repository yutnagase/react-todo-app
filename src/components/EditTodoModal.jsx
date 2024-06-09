import "../css/EditTodoModal.css";
const EditTodoModal = ({
  isOpen,
  todoText,
  todoDueDate,
  todoPriority,
  onChangeText,
  onChangeDueDate,
  onChangePriority,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>TODOを編集</h2>
        <input type="text" value={todoText} onChange={onChangeText} />
        <input type="date" value={todoDueDate} onChange={onChangeDueDate} />
        <select value={todoPriority} onChange={onChangePriority}>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
        <div className="modal-buttons">
          <button onClick={onSave}>保存</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export { EditTodoModal };
