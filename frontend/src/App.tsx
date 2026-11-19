import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Editor, Favorites, Home, Login, Register } from "@/pages";
import { Auth, ProtectedRoute, Template, ToastLayout } from "@/templates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ToastLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Template />}>
              <Route index element={<Home />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
            <Route path="editor" element={<Editor />} />
            <Route path="editor/:id" element={<Editor />} />
          </Route>
          <Route path="/" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
