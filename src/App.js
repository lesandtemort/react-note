import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [titleBackgroundColor, setTitleBackgroundColor] = useState('#fff');
  const [contentBackgroundColor, setContentBackgroundColor] = useState('#fff');

  const handleNewNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteContent.trim() !== '') {
      const newNote = {
        id: Date.now(),
        title: newNoteTitle,
        content: newNoteContent,
        titleBackgroundColor: titleBackgroundColor,
        contentBackgroundColor: contentBackgroundColor,
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsAddingNote(false);
    }
  };

  const handleCancelNote = () => {
    setIsAddingNote(false);
    setSelectedNote(null);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
    setTitleBackgroundColor(note.titleBackgroundColor || '#fff');
    setContentBackgroundColor(note.contentBackgroundColor || '#fff');
  };

  const handleEditNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              title: newNoteTitle,
              content: newNoteContent,
              titleBackgroundColor: titleBackgroundColor,
              contentBackgroundColor: contentBackgroundColor,
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.filter((note) => note.id !== selectedNote.id);
      setNotes(updatedNotes);
      setSelectedNote(null);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1>Bloc-notes</h1>
        <button className="new-note-button" onClick={() => setIsAddingNote(true)}>
          Nouvelle Note
        </button>
        <div>
          <h2>Notes</h2>
          <ul>
            {notes.map((note) => (
              <li
                key={note.id}
                onClick={() => handleNoteClick(note)}
                className={selectedNote === note ? 'note-item-selected' : ''}
              >
                {note.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {(isAddingNote || selectedNote) && (
        <div className={`note-modal ${selectedNote ? 'note-selected' : ''}`}>
          <div className="note-title">
            <input
              type="text"
              placeholder="Titre de la note"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              style={{ backgroundColor: titleBackgroundColor }}
            />
          </div>
          <div className="note-content">
            <textarea
              placeholder="Contenu de la note"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              style={{ backgroundColor: contentBackgroundColor }}
            />
            <div>
              {isAddingNote && (
                <button className="new-note-button" onClick={handleNewNote}>
                  Enregistrer
                </button>
              )}
              {selectedNote && (
                <>
                  <button className="new-note-button" onClick={handleEditNote}>
                    Enregistrer les modifications
                  </button>
                  <button className="delete-note-button" onClick={handleDeleteNote}>
                    Supprimer
                  </button>
                </>
              )}
              <button onClick={handleCancelNote}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
