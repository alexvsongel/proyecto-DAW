// Imports de hono
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { Hono } from "hono";

// Rutas
import { calendar } from "./routes/calendar";
import { documents } from "./routes/documents";
import { suggestions } from "./routes/suggestions";

const app = new Hono();

// Better Auth
app.use(
  "*",
  cors({
    origin: ["http://localhost:5174", "https://alex-vallejo.vercel.app"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("/api/auth/*", (c) => c.status(204));

app.on(["GET", "POST"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

/*Upload thing
 */

app.get("/", (c) => c.text("Bienvenido a la api!!"));
app.route("/calendar", calendar);
app.route("/documents", documents);
app.route("/suggestions", suggestions);

serve(
  {
    fetch: app.fetch,
    port: process.env.PORT ?? 3000,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
