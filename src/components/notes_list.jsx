/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Note from './note';

function NotesList(props) {
  if (Object.keys(props.notes).length === 0) {
    return <div>Try posting something!</div>;
  } else {
    console.log('notes here');
    console.log(props.notes.drafts);
    if (Object.keys(props.notes.drafts).length === 0) {
      return <div>Try posting something!</div>;
    } else {
      return (
        <div>
          {Object.entries(props.notes.drafts).map(([id, note]) => {
            return (
              <Note key={id} id={id} note={note} onDelete={props.onDelete} onEdit={props.onUpdate} onMove={props.onMove} />
            );
          })}
        </div>
      );
    }
  }
}

export default NotesList;
