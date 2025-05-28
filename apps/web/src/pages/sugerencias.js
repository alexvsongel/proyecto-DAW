import {
  modoOscuroOff,
  backgroundColorButton,
  accentColor,
  fontSizeh2,
  fontSizeh3,
} from "../lib/constants";
import { getSession } from "../lib/auth";
import { Layout } from "../components/layout";

async function getSugerencias() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/suggestions`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const events = await response.json();

    return events;
  } catch (error) {
    console.error("Error fetching actividades:", error);
    return [];
  }
}

export function Sugerencias() {
  let sugerencias = [];

  let filtros = {
    nombre: "",
    fecha: "",
    titulo: "",
  };

  return {
    oninit: async () => {
      const session = await getSession();
      sugerencias = await getSugerencias();
    },
    onupdate: () => {
      sugerencias.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
    view: () =>
      m(Layout, [
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Sugerencias"
        ),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
          },
          [
            sugerencias.map((sugerencia) =>
              m(
                "div",
                {
                  tabindex: "0",
                  role: "article",
                  style: {
                    backgroundColor: backgroundColorButton,
                    padding: "20px",
                    borderRadius: "30px",
                    border: `2px solid ${
                      modoOscuroOff ? "transparent" : accentColor
                    }`,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    cursor: "pointer",
                    outline: "none",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = accentColor;
                    e.target.style.outline = "none";
                  },
                  onblur: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = "scale(1)";
                  },
                  onmouseenter: (e) => {
                    e.target.style.backgroundColor = accentColor;
                  },
                  onmouseleave: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = "scale(1)";
                  },
                },
                [
                  m(
                    "h2",
                    {
                      style: {
                        fontSize: fontSizeh2,
                        color: modoOscuroOff ? "black" : "white",
                        marginBottom: "10px",
                      },
                    },
                    sugerencia.title
                  ),
                  m(
                    "p",
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? "black" : "white",
                        marginBottom: "5px",
                      },
                    },
                    `Usuario: ${sugerencia.user_name}`
                  ),
                  m(
                    "p",
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? "black" : "white",
                      },
                    },
                    `Fecha: ${new Date(
                      sugerencia.created_at
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`
                  ),
                ]
              )
            ),
          ]
        ),
      ]),
  };
}
