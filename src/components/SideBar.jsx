import React from "react";
import { BsFillPencilFill, BsMusicNoteBeamed } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="pt-5 left-0 min-h-screen w-16 flex flex-col bg-color3 shadow-lg">
      <SideBarLink icon={<BsMusicNoteBeamed />} text="Rhyme" to="/Rhyme" />
      <SideBarLink icon={<BsFillPencilFill />} text="Write" to="/Write" />
      <SideBarLink icon={<FaRandom />} text="Random" to="/Random" />
      <div className="flex-grow"></div>
    </div>
  );
};

const SideBarLink = ({ icon, text = "tooltip 💡", to }) => (
  <NavLink
    to={to}
    // activeClassName="active"
    className="sidebar-link"
    // exact={true}
  >
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  </NavLink>
);

export default SideBar;
