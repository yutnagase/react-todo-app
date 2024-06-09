import React from "react";
import "../css/EditTodoModal.css";
const EditTodoModal = ({ isOpen, todoText, onChange, onSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>TODOを編集</h2>
        <input type="text" value={todoText} onChange={onChange} />
        <div className="modal-buttons">
          <button onClick={onSave}>保存</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export { EditTodoModal };
