import { createServerFn } from "@tanstack/react-start";

export const fetchCheckupCards = createServerFn({ method: "GET" }).handler(async () => {
  const { listCheckupCards } = await import("./checkups.server");
  return listCheckupCards();
});
