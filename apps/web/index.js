import {Buzon} from './src/pages/buzon';
import {Login} from './src/pages/login';
import {Inicio} from './src/pages/inicio';
import {Galeria} from './src/pages/galeria';
import {Calendario} from './src/pages/calendario';
import {Documentos} from './src/pages/documentos';
import {Sugerencias} from './src/pages/sugerencias';
import {AñadirActividad} from './src/pages/añadir-actividad';
import {AñadirUsuario} from './src/pages/añadir-usuario';

const routes = {
  '/Login': {view: () => m(Login)},
  '/Buzon': {view: () => m(Buzon)},
  '/Inicio': {view: () => m(Inicio)},
  '/Galeria': {view: () => m(Galeria)},
  '/Calendario': {view: () => m(Calendario)},
  '/Documentos': {view: () => m(Documentos)},
  '/Sugerencias': {view: () => m(Sugerencias)},
  '/AñadirActividad': {view: () => m(AñadirActividad)},
  '/AñadirUsuario': {view: () => m(AñadirUsuario)}
};

m.route(document.body, '/Login', routes);
