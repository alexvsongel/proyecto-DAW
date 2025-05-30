// import {Hono} from 'hono';
// import {auth} from '../lib/auth.js';

// import {database, schema} from '../lib/database.js';

// const calendar = new Hono();

// calendar.get('/', async c => {
//   const authorized = await auth.api.getSession({
//     headers: c.req.raw.headers
//   });

//   if (!authorized) {
//     return c.json({error: 'Inicia sesión para continuar.'}, 401);
//   }

//   const query = await database.query.calendar.findMany({});

//   if (query.length === 0) {
//     return c.json([]);
//   }

//   const result = query.map(event => {
//     return {
//       id: event.id,
//       title: event.title,
//       start: event.start_date,
//       ubicacion: event.location,
//       descripcion: event.description
//     };
//   });

//   return c.json(result);

//   /*
//   return c.json([
//     {
//       title: "Día de cine",
//       start: "2025-04-21",
//       end: "2025-04-25",
//       ubicacion: "",
//       descripcion: "",
//     },

//   return c.json(resultado);

//   /*
//   return c.json([
//     {
//       title: "Día de cine",
//       start: "2025-04-21",
//       end: "2025-04-25",
//       ubicacion: "",
//       descripcion: "",
//     },
//     {
//       title: "Taller de cocina",
//       start: "2025-04-19T14:30:00",
//       end: "2025-04-19T17:30:00",
//       ubicacion: "",
//       descripcion: "",
//     },
//     {
//       title: "Taller de cocina",
//       start: "2025-04-19",
//       ubicacion: "",
//       descripcion: "",
//     },
//     {
//       title: "Patinaje",
//       start: "2025-04-20",
//       ubicacion: "",
//       descripcion: "",
//     },
//   ]);
//   */
// });

// calendar.post('/', async c => {
//   const authorized = await auth.api.getSession({
//     headers: c.req.raw.headers
//   });

//   if (!authorized) {
//     return c.json({error: 'Inicia sesión para continuar.'}, 401);
//   }

//   if (authorized.user.role !== 'admin') {
//     return c.json({error: 'No tienes permisos para hacer esta acción.'}, 401);
//   }

//   const nuevoEvento = await c.req.json();

//   // aqui valida que los campos del object esten bien
//   // IIMPORTANTE, SI NO VAS A MORIR !!!!

//   // Aquí guardas en una base de datos
//   database.insert(schema.calendar).values({
//     title: nuevoEvento.titulo ?? '',
//     location: nuevoEvento.ubicacion ?? '',
//     start_date: nuevoEvento.fecha ?? Date.now().toString(),
//     hour: nuevoEvento.hora ?? '',
//     description: nuevoEvento.descripcion ?? ''
//   });

//   return c.json({
//     success: true,
//     message: 'Evento añadido correctamente',
//     data: nuevoEvento
//   });
// });

// calendar.put('/', async c => {
//   return c.json('Aqui podrias usar el put para editar el evento');
// });

// calendar.delete('/', async c => {
//   return c.json('Aqui podrias usar el delete para borrar el evento');
// });

// export {calendar};

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

  alert("Actividad añadida correctamente");
  return c.json({
    success: true,
    message: "Actividad añadida correctamente",
    data: newActivity,
  });
});

export { calendar };
