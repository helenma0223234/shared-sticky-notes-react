/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function Note({
  id, note, onDelete, onEdit,
}) {
  const [editingId, setEditingId] = useState(null);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setEditingId(id);
    onEdit(id);
  };

  return (
    <div className="notepad"
      style={{
        position: 'absolute',
        left: note.x,
        top: note.y,
        zIndex: note.zIndex,
      }}
    >
      <div className="note-content">
        <h3>{note.title}</h3>
        <p>{note.text}</p>
      </div>
      <div className="note-footer">
        <button type="button" onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square" />
        </button>
        <button type="button" onClick={handleDelete}>
          <i className="fa-solid fa-trash" />
        </button>
      </div>
    </div>
  );
}

export default Note;
