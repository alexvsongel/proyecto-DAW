import {Hono} from 'hono';
import { auth } from "../lib/auth.js";
import { database, schema } from "../lib/database.js";

const documents = new Hono();

documents.get("/", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const query = await database.query.documents.findMany({});

  if (query.length === 0) {
    return c.json([]);
  }

  const documents = await Promise.all(
    query.map(async (event) => {
      const user = await database.query.user.findFirst({
        where: (table, { eq }) => eq(table.id, event.userId),
      });

      return {
        id: event.id,
        nombre: event.file_name,
        fechaSubida: event.created_at,
        url: event.file_url,
        usuario: user?.name ?? "null",
      };
    })
  );

  return c.json(documents);
});

documents.post("/", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const form = await c.req.parseBody();
  const file = form.file;

  if (!file || Array.isArray(file)) {
    return c.json({ error: "Archivo no encontrado en el formulario." }, 400);
  }

  await database.insert(schema.documents).values({
    user_id: 0,
    userId: authorized.user.id,
    file_name: file.name,
    file_url: "",
  });

  return c.json({
    success: true,
    message: "documento añadido correctamente"
  });
});

documents.delete("/:id", async (c) => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!authorized) {
    return c.json({ error: "Inicia sesión para continuar." }, 401);
  }

  const { id } = c.req.param();

  await database
    .delete(schema.documents)
    .where(eq(schema.documents.id, id));

  return c.json({
    success: true,
    message: "documento eliminado correctamente",
  });
});

export { documents };
