import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Button, Toast } from "@/components";
import { useAuth } from "@/hooks";
import { Header, Input, Link } from "@/templates/Auth";

// import styles from "./Login.module.css";

export function Login() {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth();
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit() {
    if (isSubmitting || isLoading) return;
    if (email.trim() === "") {
      setToast(<Toast type="error" title="Email requerido" message="Ingresa tu email para continuar" />);
      return;
    }
    if (password.trim() === "") {
      setToast(<Toast type="error" title="Contraseña requerida" message="Ingresa tu contraseña para continuar" />);
      return;
    }
    setToast(null);
    setIsSubmitting(true);

    try {
      await signIn({ email: email.trim(), password });
      navigate("/");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "No pudimos iniciar sesión. Inténtalo nuevamente.";

      setToast(<Toast type="error" title="No se pudo iniciar sesión" message={message} />);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header title="Entrar" subtitle="Ingresa tus credenciales" />
      <Input label="Email" type="email" placeholder="tu@correo.com" value={email} setValue={setEmail} />
      <Input label="Contraseña" type="password" placeholder="••••••••" value={password} setValue={setPassword} />
      <Button
        text={isSubmitting ? "Entrando…" : isLoading ? "Recuperando sesión…" : "Entrar"}
        disabled={isSubmitting || isLoading}
        onClick={onSubmit}
        customStyles={{ padding: "12px", fontSize: "14px" }}
      />
      <Link text="¿No tienes cuenta?" link="/register" textLink="Crear cuenta" />
    </>
  );
}
