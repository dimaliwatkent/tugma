import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Write = () => {
  const [notes, setNotes] = useState([]);

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
    <div className="container mx-auto p-4 pt-20 min-h-screen">
      <h1>WRITE </h1>

      <div className="mt-8">
        <Link to={`/write/${-1}`}>
          <button
            className={`text-color2 fixed right-2.5 bottom-2.5 mb-20 md:mb-0 z-30 bg-color1 hover:bg-[#213f57] hover:text-white focus:outline-none font-medium rounded-lg text-xl px-4 py-2 ${
              notes.length || "hidden"
            }`}
          >
            Add Note
          </button>
        </Link>

        <div className="flex flex-wrap gap-4 justify-center">
          {notes.length ? (
            notes.map((note, index) => (
              <Link
                to={`/write/${index}`}
                className="bg-color3 p-4 w-[300px] rounded-xl border-2 border-color1/75 relative min-h-[60px]"
                key={index}
              >
                <button
                  className="bg-color1 hover:bg-[#213f57] hover:text-white text-color3 font-bold py-2 px-4 rounded-lg mt-2 absolute top-0 right-2 text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteNote(index);
                  }}
                >
                  Delete
                </button>

                <div className="line-clamp-3">
                  <h3 className="font-bold text-lg">{note.title}</h3>
                  <p>{note.content}</p>
                </div>
              </Link>
            ))
          ) : (
            <Link to={`/write/${-1}`}>
              <button className="text-color2 mb-20 md:mb-0 z-30 bg-color1 hover:bg-[#213f57] hover:text-white focus:outline-none font-medium rounded-lg text-xl px-4 py-2">
                Add a New Note
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Write;
