import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Page from "./Components/page/page.jsx";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* ✅ Wrap everything inside BrowserRouter */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/:category" element={<Page />} /> {/* Dynamic category */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
