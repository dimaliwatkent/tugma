import { Routes, Route, Navigate } from "react-router-dom";
import { TopBar, SideBar, Rhyme, Write, Random, EditNote } from "./components";

export default function App() {
  return (
    <div className="bg-color2 ">
      <div className="flex">
        <TopBar />
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/rhyme" />} />
          <Route path="/rhyme" element={<Rhyme />} />
          <Route path="/write" element={<Write />} />
          <Route path="/write/:index" element={<EditNote />} />

          <Route path="/random" element={<Random />} />
        </Routes>
      </div>
    </div>
  );
}
