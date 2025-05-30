import {
  modoOscuroOff,
  accentColor,
  backgroundColorButton,
  fontSizeh1,
  fontSizeh3,
} from "../lib/constants";
import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { getSession } from "../lib/auth";

async function getDocumentosUsuario() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/documents`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const documents = await response.json();

    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

export function Documentos() {
  let archivoSeleccionado = null;

  const formData = new FormData();

  let loading = false;
  let error = "";

  let documentos = [];

  const handleFileSelect = (event) => {
    archivoSeleccionado = event.target.files[0];
    formData.append("file", archivoSeleccionado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivoSeleccionado) {
      alert("Por favor, selecciona un archivo");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/documents`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      loading = false;
      error = response.text;
      return;
    }
    // Aquí iría la lógica para subir el archivo al servidor
    alert("Archivo subido correctamente");
    documentos = await getDocumentosUsuario();
    m.redraw();
  };

  const handleDelete = async (id) => {
    // Aquí iría la lógica para borrar el archivo del servidor
    // documentos = documentos.filter((doc) => doc.id !== id);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/documents/${id}`,
      {
        method: "delete",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    documentos = await getDocumentosUsuario();
    m.redraw();
  };

  return {
    oninit: async () => {
      await getSession();
      m.redraw();
    },
    oncreate: async () => {
      documentos = await getDocumentosUsuario();
      m.redraw();
    },
    view: () =>
      m(Layout, [
        m(
          "h1",
          {
            style: {
              fontSize: fontSizeh1,
              color: modoOscuroOff ? "black" : "white",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Documentos"
        ),
        // Vista del usuario
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "2vh  auto",
              flexDirection: "column",
              gap: "20px",
            },
          },
          [
            // Botón para subir archivos
            m(
              "form",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginBottom: "30px",
                  width: "100%",
                },
                onsubmit: handleSubmit,
              },
              [
                m(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      alignItems: "center",
                      width: "100%",
                    },
                  },
                  [
                    m(
                      "label",
                      {
                        style: {
                          fontSize: fontSizeh3,
                          color: modoOscuroOff ? "black" : "white",
                          textAlign: "center",
                        },
                      },
                      "Subir nuevo documento"
                    ),
                    m(
                      "div",
                      {
                        style: {
                          position: "relative",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        },
                      },
                      [
                        m("input", {
                          type: "file",
                          onchange: handleFileSelect,
                          style: {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                            cursor: "pointer",
                            zIndex: 2,
                          },
                        }),
                        m(
                          "div",

                          {
                            style: {
                              backgroundColor: backgroundColorButton,
                              padding: "0.8rem 2rem",
                              borderRadius: "30px",
                              border: `2px solid ${modoOscuroOff ? "#ccc" : accentColor
                                }`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              width: "100%",
                              maxWidth: "600px",
                            },
                          },
                          [
                            m("img", {
                              src: modoOscuroOff
                                ? "imagenes/subir.svg"
                                : "imagenes/subirBlanco.svg",
                              alt: "Subir archivo",
                              style: {
                                width: "24px",
                                height: "24px",
                              },
                            }),
                            m(
                              "span",
                              {
                                style: {
                                  fontSize: fontSizeh3,
                                  color: modoOscuroOff ? "black" : "white",
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                },
                              },
                              archivoSeleccionado
                                ? archivoSeleccionado.name
                                : "Seleccionar archivo"
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
                m(Button, "Subir archivo"),
              ]
            ),
            // Lista de documentos
            documentos.map((doc) =>
              m(
                "div",
                {
                  style: {
                    backgroundColor: backgroundColorButton,
                    padding: "20px",
                    borderRadius: "30px",
                    border: `2px solid ${modoOscuroOff ? "transparent" : accentColor
                      }`,
                    display: "flex",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                  },
                },
                [
                  m(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection:
                          window.innerWidth <= 600 ? "column" : "row",
                        alignItems:
                          window.innerWidth <= 600 ? "flex-start" : "center",
                        gap: window.innerWidth <= 600 ? "10px" : "20px",
                        flex: 1,
                        width: "100%",
                      },
                    },
                    [
                      m(
                        "span",
                        {
                          style: {
                            fontSize: fontSizeh3,
                            color: modoOscuroOff ? "black" : "white",
                            wordBreak: "break-word",
                            maxWidth: window.innerWidth <= 600 ? "100%" : "50%",
                          },
                        },
                        doc.nombre
                      ),
                      m(
                        "span",
                        {
                          style: {
                            fontSize: fontSizeh3,
                            color: modoOscuroOff ? "black" : "white",
                            whiteSpace:
                              window.innerWidth <= 600 ? "normal" : "nowrap",
                          },
                        },
                        new Date(doc.fechaSubida).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      ),
                    ]
                  ),
                  m(
                    "button",
                    {
                      onclick: async () => await handleDelete(doc.id),
                      style: {
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        alignSelf:
                          window.innerWidth <= 600 ? "flex-end" : "center",
                      },
                      onfocus: (e) => {
                        e.target.style.backgroundColor = backgroundColorButton;
                        e.target.style.outline = `2px solid ${accentColor}`;
                      },
                      onblur: (e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.outline = "none";
                      },
                      onmouseenter: (e) => {
                        e.target.style.backgroundColor = backgroundColorButton;
                      },
                      onmouseleave: (e) => {
                        e.target.style.backgroundColor = "transparent";
                      },
                    },
                    m("img", {
                      src: modoOscuroOff
                        ? "imagenes/borrar.svg"
                        : "imagenes/borrarBlanco.svg",
                      alt: "Borrar documento",
                      style: {
                        width: "24px",
                        height: "24px",
                      },
                    })
                  ),
                ]
              )
            ),
          ]
        )
      ]),
  };
}
