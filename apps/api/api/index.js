import { handle } from 'hono/vercel'
import {cors} from 'hono/cors';
import {auth} from './lib/auth.js';
import { Hono } from 'hono'

// Rutas
import {calendar} from './routes/calendar.js';
import {documents} from './routes/documents.js';
import {suggestions} from './routes/suggestions.js';

const app = new Hono().basePath('/api')

app.use(
  '*',
  cors({
    origin: ['http://localhost:5174', 'https://alex-vallejo.vercel.app'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.options('/api/auth/*', c => c.status(204));

app.on(['GET', 'POST'], '/api/auth/*', c => {
  return auth.handler(c.req.raw);
});

/*Upload thing
 */

app.get('/', c => c.text('Bienvenido a la api!!'));
app.route('/calendar', calendar);
app.route('/documents', documents);
app.route('/suggestions', suggestions);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
