/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';

function Note({
  id, note, onDelete, onEdit, onMove,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  const onStop = () => {
    const updateX = deltaPosition.x + note.x;
    const updateY = deltaPosition.y + note.y;
    onMove({ id, updateX, updateY });
  };

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    console.log(note.x);
    setIsEditing(true);
  };

  const handleEditDone = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.noteTitle;
    const content = formJson.noteContent;
    const updateX = note.x;
    const updateY = note.y;
    onEdit({
      id, title, content, updateX, updateY,
    });
    setIsEditing(false);
  };

  function renderNote() {
    if (isEditing) {
      return (
        <div className="notepad"
          style={{
            position: 'absolute',
            left: note.x,
            top: note.y,
            zIndex: note.zIndex,
          }}
        >
          <form onSubmit={handleEditDone}>
            <label>
              <input name="noteTitle" defaultValue={note.title} />
            </label>
            <label>
              <textarea
                name="noteContent"
                defaultValue={note.text}
                rows={4}
                cols={40}
              />
            </label>
            <div className="note-footer">
              <button type="submit">Done</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <Draggable
          handle=".notepad"
          grid={[1, 1]}
          scale={1}
          onDrag={handleDrag}
          onStop={onStop}
          position={null}
          bounds="body"
          cancel="strong"
        >
          <div className="notepad draggable"
            style={{
              position: 'absolute',
              left: note.x,
              top: note.y,
              zIndex: note.zIndex,
            }}
          >
            <div className="note-content">
              <h3>{note.title}</h3>
              <ReactMarkdown>{note.text || ''}</ReactMarkdown>
            </div>
            <div className="note-footer">
              <strong>
                <button type="button" onClick={handleEdit}>
                  <i className="fa-solid fa-pen-to-square" />
                </button>
                <button type="button" onClick={handleDelete}>
                  <i className="fa-solid fa-trash" />
                </button>
              </strong>
            </div>
          </div>
        </Draggable>
      );
    }
  }

  return (
    <div>
      {renderNote()}
    </div>
  );
}

export default Note;
