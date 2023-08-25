import React from "react";
import { BsFillPencilFill, BsMusicNoteBeamed } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="hidden sm:block pt-5 left-0 min-h-screen w-16  flex-col bg-color3 shadow-lg">
        <SideBarLink icon={<BsMusicNoteBeamed />} text="Rhyme" to="/Rhyme" />
        <SideBarLink icon={<BsFillPencilFill />} text="Write" to="/Write" />
        <SideBarLink icon={<FaRandom />} text="Random" to="/Random" />
        {/* <div className="flex-grow"></div> */}
      </div>
      {/* for mobile */}
      <div className="sm:hidden bottom-0 w-screen h-[70px] fixed flex flex-row bg-color3 shadow-lg justify-center items-center gap-5 py-3">
        <SideBarLink icon={<BsMusicNoteBeamed />} text="Rhyme" to="/Rhyme" />
        <SideBarLink icon={<BsFillPencilFill />} text="Write" to="/Write" />
        <SideBarLink icon={<FaRandom />} text="Random" to="/Random" />
      </div>
    </>
  );
};

const SideBarLink = ({ icon, text = "tooltip 💡", to }) => (
  <NavLink
    to={to}
    activeclassname="active"
    className="sidebar-link"
    exact="true" //ensure that the link is only active when the URL matches exactly
  >
    <div className="sidebar-icon group">
      {icon}
      <span className="hidden sm:block sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  </NavLink>
);

export default SideBar;
