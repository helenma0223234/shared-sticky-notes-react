/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { produce } from 'immer';
import NotesList from './notes_list';
import InputBox from './input_box';

function App(props) {
  const [notes, setNotes] = useState({
    id1: {
      title: 'testing',
      text: 'I is a note',
      x: 500,
      y: 200,
      zIndex: 1,
    },
  });

  function addNote(newNote) {
    setNotes(
      produce((draft) => {
        const newId = `id${Object.keys(draft).length + 1}`;
        const lastNote = Object.values(draft).pop();
        const newZIndex = lastNote ? lastNote.zIndex + 1 : 0;
        draft[newId] = {
          title: newNote.noteTitle,
          text: newNote.noteContent,
          x: 400,
          y: 120,
          zIndex: newZIndex,
        };
      }),
    );
  }

  function onDelete(noteId) {
    setNotes(
      produce((draft) => {
        delete draft[noteId];
      }),
    );
  }

  function updateNote(edited) {
    setNotes(
      produce((draft) => {
        draft[edited.editingId] = { ...draft[edited.editingId], title: edited.title, text: edited.content };
      }),
    );
  }

  return (
    <div className="body-container">
      <h2>Add your note...</h2>
      <InputBox onAddNote={(newNote) => addNote(newNote)} />
      <NotesList onDelete={(noteId) => onDelete(noteId)} onUpdate={(edited) => updateNote(edited)} notes={notes} />
    </div>
  );
}

export default App;
