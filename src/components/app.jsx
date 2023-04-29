/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import NotesList from './notes_list';

function App(props) {
  const [notes, setNotes] = useState({
    id1: {
      title: 'testing',
      text: 'I is a note',
      x: 400,
      y: 120,
      zIndex: 26,
    },
    id2: {
      title: 'Note 2',
      text: 'This is the second note.',
      x: 200,
      y: 200,
      zIndex: 2,
    },
  });

  return (
    <div className="body">
      <h2>Add your note...</h2>
      <NotesList notes={notes} />
    </div>
  );
}

export default App;
