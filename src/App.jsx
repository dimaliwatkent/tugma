import { Routes, Route, Navigate } from "react-router-dom";
import { TopBar, SideBar, Rhyme, Write, Random } from "./components";

export default function App() {
  return (
    <div className="bg-color2">
      <TopBar />
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/Rhyme" />} />
          <Route path="/Rhyme" element={<Rhyme />} />
          <Route path="/Write" element={<Write />} />
          <Route path="/Random" element={<Random />} />
        </Routes>
      </div>
    </div>
  );
}
