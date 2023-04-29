import React from 'react';

function Note(props) {
  console.log(props);
  return (
    <div className="notepad"
      style={{
        position: 'absolute',
        left: props.note.x,
        top: props.note.y,
        zIndex: props.note.zIndex,
      }}
    >
      <h3>{props.note.title}</h3>
      <p>{props.note.text}</p>
    </div>
  );
}

export default Note;
