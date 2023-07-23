import React, { useState, useEffect } from "react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

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

    setNotes((prevNotes) => [...prevNotes, newNote]);

    setTitle("");
    setContent("");
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
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
        Save Note
      </button>

      <div className="mt-8">
        <h2 className="font-bold mb-4">Saved Notes:</h2>
        {notes.map((note, index) => (
          <div className="bg-gray-100 p-4 mb-4" key={index}>
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleDeleteNote(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Write;
