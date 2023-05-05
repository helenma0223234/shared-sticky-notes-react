import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import NotesList from './notes_list';
import InputBox from './input_box';
import {
  onNotesValueChange, onNoteDelete, onNoteAdd,
} from '../services/datastore';

function App() {
  const [notes, setNotes] = useState({});

  function addNote(newNote) {
    console.log(newNote);
    console.log(notes);

    // increment z-index according to note sequence
    let newZIndex = 0;
    if (Object.keys(notes).length !== 0) {
      const lastNote = Object.values(notes.drafts)?.pop();
      newZIndex = lastNote ? lastNote.zIndex + 1 : 0;
    }
    console.log(newZIndex);
    // console.log(notes);
    onNoteAdd(newNote, newZIndex);

    /* code for local storage */
    // setNotes(
    //   produce((draft) => {
    //     const noteId = `id${Object.keys(draft).length + 1}`;
    //     const lastNote = Object.values(draft).pop();
    //     const newZIndex = lastNote ? lastNote.zIndex + 1 : 0;
    //     draft[noteId] = {
    //       title: newNote.noteTitle,
    //       text: newNote.noteContent,
    //       x: 400,
    //       y: 120,
    //       zIndex: newZIndex,
    //     };
    //   }),
    // );
  }

  function onDelete(noteId) {
    onNoteDelete(noteId);

    /* code for local storage */
    // setNotes(
    //   produce((draft) => {
    //     delete draft[noteId];
    //   }),
    // );
  }

  function updateNote(edited) {
    // console.log('moved');
    console.log(edited);
    setNotes(
      produce((draft) => {
        draft[edited.id] = {
          ...draft[edited.id], title: edited.title, text: edited.content,
        };
      }),
    );
    console.log(notes[edited.id]);
  }

  function updateNotePos(moved) {
    setNotes(
      produce((draft) => {
        draft[moved.id] = { ...draft[moved.id], x: moved.updateX, y: moved.updateY };
      }),
    );
  }

  // Whenever a note is updated in db -> trigger the callback func
  useEffect(() => {
    const fetchNote = onNotesValueChange((drafts) => {
      if (drafts) {
        setNotes({ drafts });
      }
    });
    return () => {
      // unsubscribe the database listener when the component unmounts
      fetchNote();
    };
  }, []);

  return (
    <div className="body-container">
      <h2>Add your note...</h2>
      <InputBox onAddNote={(newNote) => addNote(newNote)} />
      <NotesList onDelete={(noteId) => onDelete(noteId)} onUpdate={(edited) => updateNote(edited)} onMove={(moved) => updateNotePos(moved)} notes={notes} />
    </div>
  );
}

export default App;
