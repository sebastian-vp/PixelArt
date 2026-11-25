import { expect, test } from "@playwright/test";
import { createDrawing, loginWith } from "./helper";

test.describe("PixelArt", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: { name: "Bob Dylan", email: "bob@dylan.com", password: "dylan" },
    });
    await page.goto("/");
  });

  test("sin sesión redirige al login", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();

    await page.goto("/editor");
    await page.waitForURL("**/login");
    await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();
  });

  test("login con contraseña incorrecta falla", async ({ page }) => {
    await loginWith(page, "bob@dylan.com", "incorrecta");
    await expect(
      page.getByText("Verifica tu email y contraseña."),
    ).toBeVisible();
  });

  test("login correcto da acceso", async ({ page }) => {
    await loginWith(page, "bob@dylan.com", "dylan");
    await expect(page.getByText("Bob Dylan")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Mis dibujos" }),
    ).toBeVisible();
  });

  test.describe("con sesión iniciada", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "bob@dylan.com", "dylan");
      await expect(page.getByText("Bob Dylan")).toBeVisible();
    });

    test("crear y listar dibujos", async ({ page }) => {
      await createDrawing(page, "Primer dibujo");
      await createDrawing(page, "Segundo dibujo");
      await expect(page.getByText("Primer dibujo")).toBeVisible();
      await expect(page.getByText("Segundo dibujo")).toBeVisible();
    });

    test.describe("con un dibujo creado", () => {
      test.beforeEach(async ({ page }) => {
        await createDrawing(page, "Mi dibujo");
        await expect(page.getByText("Mi dibujo")).toBeVisible();
      });

      test("editar dibujo", async ({ page }) => {
        await page.getByRole("button", { name: "Abrir" }).click();
        await page
          .getByRole("textbox", { name: "Titulo" })
          .fill("Dibujo editado");
        await page.getByRole("button", { name: "Guardar y Salir" }).click();
        await expect(page.getByText("Dibujo editado")).toBeVisible();
        await expect(page.getByText("Mi dibujo")).not.toBeVisible();
      });

      test("eliminar dibujo", async ({ page }) => {
        await page.getByRole("button", { name: "Eliminar Mi dibujo" }).click();
        await page
          .getByRole("dialog")
          .getByRole("button", { name: "Eliminar" })
          .click();
        await expect(page.getByText("Aún no tienes dibujos")).toBeVisible();
      });
    });
  });
});
