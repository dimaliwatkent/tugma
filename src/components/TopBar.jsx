import { GiFeather } from "react-icons/gi";
import { Link } from "react-router-dom";
import React from "react";

const Topbar = () => {
  return (
    <header className="bg-color1">
      <div className="container py-4 px-8">
        <div className="flex items-center justify-between">
          <Link to="/Rhyme" className="logo-link flex items-center">
            <GiFeather size={50} style={{ color: "#f4ac48" }} />
            <span
              className="text-color2 text-4xl font-semibold"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              Tugma
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
