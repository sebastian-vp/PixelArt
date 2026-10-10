import type { getSession } from "#src/services/auth";

declare module "express-serve-static-core" {
  interface Locals {
    session: Awaited<ReturnType<typeof getSession>>;
  }
}
