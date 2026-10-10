import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Editor, Favorites, Home, Login, Register } from "@/pages";
import { Auth, ProtectedRoute, Template } from "@/templates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Template />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route path="/" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
