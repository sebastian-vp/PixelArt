import { type ReactElement, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Button, Toast } from "@/components";
import { Header, Input, Link } from "@/templates/Auth";

// import styles from "./Login.module.css";

export function Login() {
  const navigate = useNavigate();
  const setToast: (value: ReactElement) => void = useOutletContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    if (email === "") {
      setToast(<Toast type="error" title="Email requerido" message="Ingresa tu email para continuar" />);
      return;
    }
    if (password === "") {
      setToast(<Toast type="error" title="Contraseña requerida" message="Ingresa tu contraseña para continuar" />);
      return;
    }
    if (email !== "prueba@correo.com" || password !== "12345") {
      setToast(<Toast type="error" title="Credenciales inválidas" message="Verifica tu email y contraseña" />);
      return;
    }

    navigate("/");
  }

  return (
    <>
      <Header title="Entrar" subtitle="Ingresa tus credenciales" />
      <Input label="Email" placeholder="tu@correo.com" value={email} setValue={setEmail} />
      <Input label="Contraseña" type="password" placeholder="••••••••" value={password} setValue={setPassword} />
      <Button text="Entrar" onClick={onSubmit} customStyles={{ padding: "12px", fontSize: "14px" }} />
      <Link text="¿No tienes cuenta?" link="/register" textLink="Crear cuenta" />
    </>
  );
}
