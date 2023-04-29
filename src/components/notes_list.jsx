import React from 'react';
import Note from './note';

function NotesList(props) {
  if (!props.notes) {
    return <div>Try posting something!</div>;
  }

  return (
    <div>
      {Object.entries(props.notes).map(([id, note]) => (
        <Note key={id} note={note} />
      ))}
    </div>
  );
}

export default NotesList;
