/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Note from './note';

function NotesList(props) {
  if (!props.notes) {
    return <div>Try posting something!</div>;
  }

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleEditDone = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.noteTitle;
    const content = formJson.noteContent;
    props.onUpdate({ editingId, title, content });
    setEditingId(null);
  };

  return (
    <div>
      {Object.entries(props.notes).map(([id, note]) => {
        if (editingId === id) {
          return (
            <div className="input-box"
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
            <Note key={id} id={id} note={note} onDelete={props.onDelete} onEdit={handleEdit} />
          );
        }
      })}
    </div>
  );
}

export default NotesList;
