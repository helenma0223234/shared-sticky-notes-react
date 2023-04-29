/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function InputBox(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    props.onAddNote(formJson);
    e.target.reset();
  };

  return (
    <div className="input-box">
      <form onSubmit={handleSubmit}>
        <label>
          <input name="noteTitle" placeholder="Title" />
        </label>
        <label>
          <textarea
            name="noteContent"
            placeholder="type content here..."
            rows={4}
            cols={40}
          />
        </label>
        <div className="note-footer">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default InputBox;
