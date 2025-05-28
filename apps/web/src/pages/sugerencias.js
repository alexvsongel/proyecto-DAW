import {
  modoOscuroOff,
  backgroundColorButton,
  accentColor,
  fontSizeh2,
  fontSizeh3
} from '../lib/constants';
import {Layout} from '../components/layout';
import {getSession} from '../lib/auth';

async function getSugerencias() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/suggestions`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const events = await response.json();

  return events;
}

export function Sugerencias() {
  let sugerencias = [];
  let role = 'user';

  const filtros = {
    nombre: '',
    fecha: '',
    titulo: ''
  };

  const filtrarSugerencias = () => {
    return sugerencias.filter(sugerencia => {
      const coincideNombre = sugerencia.username
        .toString()
        .includes(filtros.nombre);
      const coincideTitulo = sugerencia.title
        .toLowerCase()
        .includes(filtros.titulo.toLowerCase());
      const coincideFecha =
        filtros.fecha === '' ||
        new Date(sugerencia.created_at)
          .toLocaleDateString('es-ES')
          .includes(filtros.fecha);

      return coincideNombre && coincideTitulo && coincideFecha;
    });
  };

  return {
    oninit: async () => {
      const session = await getSession();
      sugerencias = await getSugerencias();
      role = session?.role;
      m.redraw();
    },
    onupdate: () => {
      sugerencias.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
    view: () =>
      m(Layout, [
        m(
          'h1',
          {
            style: {
              fontSize: '3em',
              color: modoOscuroOff ? 'black' : 'white',
              textAlign: 'center',
              margin: '20px 0'
            }
          },
          'Sugerencias'
        ),
        m(
          'div',
          {
            style: {
              width: '90%',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }
          },
          [
            m(
              'div',
              {
                style: {
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '15px',
                  marginBottom: '20px'
                }
              },
              [
                m('input', {
                  type: 'text',
                  placeholder: 'Buscar por nombre usuario',
                  value: filtros.nombre,
                  oninput: e => {
                    filtros.nombre = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: '1',
                    minWidth: '200px',
                    padding: '10px',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    color: modoOscuroOff ? 'black' : 'white'
                  },
                  onfocus: e => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = 'none';
                    e.target.style.color = modoOscuroOff ? 'black' : 'white';
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: e => {
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.outline = 'none';
                    e.target.style.color = 'black';
                    e.target.style.border = '2px solid #ccc';
                  }
                }),
                m('input', {
                  type: 'text',
                  placeholder: 'Buscar por tÃ­tulo',
                  value: filtros.titulo,
                  oninput: e => {
                    filtros.titulo = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: '1',
                    minWidth: '200px',
                    padding: '10px',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    color: modoOscuroOff ? 'black' : 'white'
                  },
                  onfocus: e => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = 'none';
                    e.target.style.color = modoOscuroOff ? 'black' : 'white';
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: e => {
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.outline = 'none';
                    e.target.style.color = 'black';
                    e.target.style.border = '2px solid #ccc';
                  }
                }),
                m('input', {
                  type: 'date',
                  value: filtros.fecha,
                  oninput: e => {
                    filtros.fecha = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: '1',
                    minWidth: '200px',
                    padding: '10px',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    color: modoOscuroOff ? 'black' : 'white'
                  },
                  onfocus: e => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = 'none';
                    e.target.style.color = modoOscuroOff ? 'black' : 'white';
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: e => {
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.outline = 'none';
                    e.target.style.color = 'black';
                    e.target.style.border = '2px solid #ccc';
                  }
                })
              ]
            ),
            filtrarSugerencias().map(sugerencia =>
              m(
                'div',
                {
                  tabindex: '0',
                  role: 'article',
                  style: {
                    backgroundColor: backgroundColorButton,
                    padding: '20px',
                    borderRadius: '30px',
                    border: `2px solid ${
                      modoOscuroOff ? 'transparent' : accentColor
                    }`,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    outline: 'none'
                  },
                  onfocus: e => {
                    e.target.style.backgroundColor = accentColor;
                    e.target.style.outline = 'none';
                  },
                  onblur: e => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = 'scale(1)';
                  },
                  onmouseenter: e => {
                    e.target.style.backgroundColor = accentColor;
                  },
                  onmouseleave: e => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = 'scale(1)';
                  }
                },
                [
                  m(
                    'h2',
                    {
                      style: {
                        fontSize: fontSizeh2,
                        color: modoOscuroOff ? 'black' : 'white',
                        marginBottom: '10px'
                      }
                    },
                    sugerencia.title
                  ),
                  m(
                    'p',
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? 'black' : 'white',
                        marginBottom: '5px'
                      }
                    },
                    `Usuario: ${sugerencia.username}`
                  ),
                  m(
                    'p',
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? 'black' : 'white'
                      }
                    },
                    `Fecha: ${new Date(
                      sugerencia.created_at
                    ).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`
                  )
                ]
              )
            )
          ]
        )
      ])
  };
};