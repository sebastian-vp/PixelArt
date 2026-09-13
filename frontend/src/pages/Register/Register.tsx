import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Button, Toast } from "@/components";
import { Header, Input, Link } from "@/templates/Auth";

// import styles from "./Register.module.css";

export function Register() {
  const navigate = useNavigate();
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onSubmit() {
    if (name === "") {
      setToast(<Toast type="error" title="Nombre requerido" message="Ingresa tu nombre para continuar" />);
      return;
    }
    if (email === "") {
      setToast(<Toast type="error" title="Email requerido" message="Ingresa tu email para continuar" />);
      return;
    }
    if (password === "") {
      setToast(<Toast type="error" title="Contraseña requerida" message="Ingresa tu contraseña para continuar" />);
      return;
    }
    if (password !== confirmPassword) {
      setToast(<Toast type="error" title="Contraseñas no coinciden" message="Las contraseñas deben ser iguales" />);
      return;
    }

    setToast(null);
    navigate("/login");
  }

  return (
    <>
      <Header title="Crear cuenta" subtitle="Ingresa tus datos para crear una cuenta" />
      <Input label="Nombre" placeholder="Nombre Apellido" value={name} setValue={setName} />
      <Input label="Email" placeholder="tu@correo.com" value={email} setValue={setEmail} />
      <Input label="Contraseña" type="password" placeholder="••••••••" value={password} setValue={setPassword} />
      <Input label="Confirmar contraseña" type="password" placeholder="••••••••" value={confirmPassword} setValue={setConfirmPassword} />
      <Button text="Crear cuenta" onClick={onSubmit} customStyles={{ padding: "12px", fontSize: "14px" }} />
      <Link text="¿Ya tienes cuenta?" link="/login" textLink="Entrar" />
    </>
  );
}
