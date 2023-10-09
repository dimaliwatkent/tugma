import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";

const EditNote = () => {
  const [notes, setNotes] = useState([]);
  const { index } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(parseInt(index));
  const [note, setNote] = useState(null);
  const [showSave, setShowSave] = useState(false);
  const textAreaRef = useRef(null);

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
    // event.target.style.height = "inherit";
    // event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSaveNote = (event) => {
    event.preventDefault();
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
    setShowSave(true);
    setTimeout(() => setShowSave(false), 2000);
  };

  useHotkeys("ctrl+s", (event) => {
    handleSaveNote(event);
  });

  useEffect(() => {
    if (textAreaRef.current) {
      const { scrollTop, scrollLeft } = document.documentElement;
      textAreaRef.current.style.height = "inherit";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      document.documentElement.scrollTop = scrollTop;
    }
  }, [content]);

  return (
    <div className="container mx-auto min-h-screen px-10 md:px-20 pb-14">
      <div className="my-4">
        <h1>WRITE</h1>

        <input
          type="text"
          id="title"
          className="block w-full p-3 pl-4 pr-24 text-xl font-bold text-gray-900 border-2 border-color1 rounded-lg bg-color3  outline-none placeholder-color4"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
      </div>
      <div className="my-4">
        <textarea
          ref={textAreaRef}
          id="content"
          className="block w-full p-3 pl-4 pr-24 text-lg text-gray-900 border-2  border-color1 rounded-lg bg-color3 outline-none placeholder-color4 "
          rows="4"
          value={content}
          onChange={handleContentChange}
          placeholder="Write something..."
          style={{ overflow: "hidden" }}
        ></textarea>
      </div>
      <button
        className="text-color2 bg-color1 hover:bg-[#213f57] hover:text-white focus:outline-none font-medium rounded-lg text-lg px-4 py-2"
        onClick={handleSaveNote}
      >
        {editIndex === -1 ? (
          <Link to={`/write/${notes.length}`}>Save Note</Link>
        ) : (
          "Update Note"
        )}

        {showSave && (
          <div className="text-color2 text-xs fixed bottom-0 left-0 right-0 text-center bg-color1 z-20 mb-[70px] md:mb-0">
            Note Saved
          </div>
        )}
      </button>
      <Link to={`/write`}>
        <button className="text-color2 bg-color1 hover:bg-[#213f57] hover:text-white focus:outline-none font-medium rounded-lg text-lg px-4 py-2 ml-2">
          Back
        </button>
      </Link>
    </div>
  );
};

export default EditNote;
