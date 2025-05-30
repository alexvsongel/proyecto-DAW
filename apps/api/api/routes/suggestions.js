import { Hono } from "hono";
import { auth } from "../lib/auth.js";
import { database, eq, schema } from "../lib/database.js";

const suggestions = new Hono();

suggestions.get("/", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const query = await database.query.suggestions.findMany({});

  if (query.length === 0) {
    return c.json([]);
  }

  const suggestions = await Promise.all(
    query.map(async (event) => {
      const user = await database.query.user.findFirst({
        where: (table, { eq }) => eq(table.id, event.userId),
      });

      return {
        id: event.id,
        userId: event.user_id,
        username: user?.name ?? "null",
        title: event.title,
        start_date: event.start_date,
        hour: event.hour,
        location: event.location,
        description: event.description,
        created_at: event.created_at,
        updated_at: event.updated_at,
      };
    })
  );

  return c.json(suggestions);
});

suggestions.post("/", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const newSuggestion = await c.req.json();

  await database.insert(schema.suggestions).values({
    user_id: 0,
    userId: newSuggestion.user_id,
    title: newSuggestion.title,
    start_date: newSuggestion.start_date,
    hour: newSuggestion.hour,
    location: newSuggestion.location,
    description: newSuggestion.description,
  });

  return c.json({
    success: true,
    message: "sugerencia añadida correctamente",
    data: newSuggestion,
  });
});

suggestions.delete("/:id", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const { id } = c.req.param();

  await database
    .delete(schema.suggestions)
    .where(eq(schema.suggestions.id, id));

  return c.json({
    success: true,
    message: "sugerencia eliminada correctamente",
  });
});

export { suggestions };
