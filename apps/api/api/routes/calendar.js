import { Hono } from "hono";
import { auth } from "../lib/auth.js";
import { database, eq, schema } from "../lib/database.js";

const calendar = new Hono();

calendar.get("/", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const query = await database.query.calendar.findMany({});

  if (query.length === 0) {
    return c.json([]);
  }

  const calendar = await Promise.all(
    query.map(async (event) => {
      const user = await database.query.user.findFirst({
        where: (table, { eq }) => eq(table.id, event.userId),
      });

      return {
        id: event.id,
        title: event.title,
        start: event.start_date,
        hour: event.hour,
        location: event.location,
        description: event.description,
        created_at: event.created_at,
        updated_at: event.updated_at,
      };
    })
  );

  return c.json(calendar);
});

calendar.post("/", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const newActivity = await c.req.json();

  await database.insert(schema.calendar).values({
    title: newActivity.title,
    start_date: newActivity.start_date,
    hour: newActivity.hour,
    location: newActivity.location,
    description: newActivity.description,
  });

  return c.json({
    success: true,
    message: "Actividad añadida correctamente",
    data: newActivity,
  });
});

export { calendar };
