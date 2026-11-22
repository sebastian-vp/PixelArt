import { Page } from "@playwright/test";

const loginWith = async (page: Page, email: string, password: string) => {
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
};

const createDrawing = async (page: Page, title: string) => {
  await page.getByRole("button", { name: "+ Nuevo dibujo" }).click();
  await page.getByRole("textbox", { name: "Titulo" }).fill(title);
  await page.getByRole("button", { name: "Guardar y Salir" }).click();
};

export { loginWith, createDrawing };
