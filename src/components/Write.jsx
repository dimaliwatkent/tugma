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
    <div className="container mx-auto p-4">
      <h1>WRITE</h1>

      <div className="mt-8">
        <Link to={`/write/${-1}`}>
          <button className="text-color2 fixed right-2.5 bottom-2.5 bg-color1 hover:bg-[#213f57] focus:outline-none font-medium rounded-lg text-xl px-4 py-2">
            Add Note
          </button>
        </Link>

        <div className="flex flex-wrap-reverse gap-4 ">
          {notes.map((note, index) => (
            <Link to={`/write/${index}`}>
              <div
                className="bg-color3 p-4 w-[300px] rounded-xl border-2 border-color1/75 "
                key={index}
              >
                <div className="line-clamp-11">
                  <h3 className="font-bold">{note.title}</h3>
                  <p>{note.content}</p>
                </div>
                <div>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteNote(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
