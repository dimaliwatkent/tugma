import React, { useState, useEffect } from "react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSaveNote = () => {
    const newNote = {
      title,
      content,
    };

    if (editIndex === -1) {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } else {
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes];
        updatedNotes[editIndex] = newNote;
        return updatedNotes;
      });
      setEditIndex(-1);
    }

    setTitle("");
    setContent("");
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    if (index === editIndex) {
      setEditIndex(-1);
      setTitle("");
      setContent("");
    }
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="container mx-auto">
      <h1>WRITE</h1>

      <div className="my-4">
        <label htmlFor="title" className="font-bold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="border border-gray-300 p-2 mt-1"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="my-4">
        <label htmlFor="content" className="font-bold">
          Content:
        </label>
        <textarea
          id="content"
          className="border border-gray-300 p-2 mt-1"
          rows="4"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveNote}
      >
        {editIndex === -1 ? "Save Note" : "Update Note"}
      </button>

      <div className="mt-8">
        <h2 className="font-bold mb-4">Saved Notes:</h2>
        {notes.map((note, index) => (
          <div className="bg-gray-100 p-4 mb-4" key={index}>
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                onClick={() => {
                  setEditIndex(index);
                  setTitle(note.title);
                  setContent(note.content);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => handleDeleteNote(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Write;
