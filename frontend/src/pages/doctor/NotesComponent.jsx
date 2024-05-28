import React, { useState } from 'react';

const NotesComponent = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  const addNote = () => {
    setNotes([...notes, note]);
    setNote('');
  };

  return (
    <div>
      <h3>Notes</h3>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note"
        className="border p-2 rounded"
      />
      <button onClick={addNote} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Add Note
      </button>
      <ul className="mt-4">
        {notes.map((note, index) => (
          <li key={index} className="border-b py-2">{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotesComponent;
