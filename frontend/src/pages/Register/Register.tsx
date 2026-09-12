import { Button } from "@/components";
import { Header, Input, Link } from "@/templates/Auth";

// import styles from "./Register.module.css";

export function Register() {
  return (
    <>
      <Header title="Crear cuenta" subtitle="Ingresa tus datos para crear una cuenta" />
      <Input label="Nombre" placeholder="Nombre Apellido" />
      <Input label="Email" placeholder="tu@correo.com" />
      <Input label="Contraseña" type="password" placeholder="••••••••" />
      <Button text="Crear cuenta" onClick={() => {}} customStyles={{ padding: "12px", fontSize: "14px" }} />
      <Link text="¿Ya tienes cuenta?" link="/login" textLink="Entrar" />
    </>
  );
}
