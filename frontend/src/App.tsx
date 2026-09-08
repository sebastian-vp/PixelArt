import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Favorites, Home } from "@/pages";
import { Template } from "@/templates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
