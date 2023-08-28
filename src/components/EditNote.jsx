import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditNote = () => {
  const [notes, setNotes] = useState([]);
  const { index } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(parseInt(index));
  const [note, setNote] = useState(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    if (notes.length === 0 || index < 0 || index >= notes.length) {
      setNote(null);
      return;
    }
    setNote(notes[index]);
  }, [notes, index]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

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
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setEditIndex(notes.length);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  return (
    <div>
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
        {editIndex === -1 ? (
          <Link to={`/write/${notes.length}`}>Save Note</Link>
        ) : (
          "Update Note"
        )}
      </button>
      <button
        onClick={() => console.log(notes)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
      >
        clg
      </button>
    </div>
  );
};

export default EditNote;
