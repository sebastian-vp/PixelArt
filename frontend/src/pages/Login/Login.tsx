import { Button } from "@/components";
import { Header, Input, Link } from "@/templates/Auth";

// import styles from "./Login.module.css";

export function Login() {
  return (
    <>
      <Header title="Entrar" subtitle="Ingresa tus credenciales" />
      <Input label="Email" placeholder="tu@correo.com" />
      <Input label="Contraseña" type="password" placeholder="••••••••" />
      <Button text="Entrar" onClick={() => {}} customStyles={{ padding: "12px", fontSize: "14px"  }} />
      <Link text="¿No tienes cuenta?" link="/register" textLink="Crear cuenta" />
    </>
  );
}
