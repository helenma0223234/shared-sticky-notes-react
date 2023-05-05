/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Note from './note';

function NotesList(props) {
  if (Object.keys(props.notes).length === 0) {
    return <div>Loading...</div>;
  } else if (Object.keys(props.notes.drafts).length === 0) {
    // console.log(props.notes.drafts);
    return <div />;
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

export default NotesList;
