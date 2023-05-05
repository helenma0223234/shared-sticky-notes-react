/* eslint-disable no-unused-vars */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDLMUALd5jGYHmhCiuYrIM4JATUVBE7y1Q',
  authDomain: 'react-shared-notes.firebaseapp.com',
  databaseURL: 'https://react-shared-notes-default-rtdb.firebaseio.com',
  projectId: 'react-shared-notes',
  storageBucket: 'react-shared-notes.appspot.com',
  messagingSenderId: '453473350800',
  appId: '1:453473350800:web:e5774001ff0844c8dcd415',
  measurementId: 'G-8PJ6F8HXG1',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// subscribe to 'value' events on a Firebase database reference 'ref'
export function onNotesValueChange(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val() ?? {};
    callback(newNoteState);
  });
}

// delete on firebase
export function onNoteDelete(noteId) {
  database.ref('notes').child(noteId).remove();
}

// write to firebase
export function onNoteAdd(newNote, newZIndex) {
  const noteData = {
    title: newNote.noteTitle,
    text: newNote.noteContent,
    x: 400,
    y: 120,
    zIndex: newZIndex,
  };
  const newNoteKey = database.ref().child('notes').push().key;

  return database.ref(`/notes/${newNoteKey}`).set(noteData);
}

export function onNoteUpdateDb(id, title, content) {
  const updates = {};
  updates[`/notes/${id}/title`] = title;
  updates[`/notes/${id}/text`] = content;

  return database.ref().update(updates);
}

export function onNoteMoveDb(id, x, y) {
  const updates = {};
  updates[`/notes/${id}/x`] = x;
  updates[`/notes/${id}/y`] = y;

  return database.ref().update(updates);
}
