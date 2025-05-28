import {
  accentColor,
  modoOscuroOff,
  fontSizeh2,
  fontSizeh3,
  backgroundColorButton,
} from "../lib/constants";
import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { authClient } from "../lib/auth";

export function Login() {
  const formData = {
    usuario: "",
    contraseña: "",
  };

  let loading = false;
  let error = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
     * ESTO ES PARA CREAR LA CUENTA ADMIN
    await authClient.signUp.email({name: "admin", email: formData.usuario, password: formData.contraseña}, {
      onRequest: context => {
        // Mostrar un loader
      },
      onSuccess: context => {
        // Redirigir a la pagina de principal
        m.route.set("/Inicio");
      },
      onError: context => {
        // Mostrar error
        //console.error(context.error);
      }
    })
     */
    await authClient.signIn.email(
      { email: formData.usuario, password: formData.contraseña },
      {
        onRequest: () => {
          loading = true;
          error = "";
          m.redraw();
        },
        onResponse: () => {
          loading = false;
          m.redraw();
        },
        onSuccess: () => m.route.set("/Inicio"),
        onError: (context) => {
          error = context.error.message;
        },
      }
    );
  };
  //que funcionalidad necesita????????????????????????????
  const handleInputChange = (key, value) => {
    //Falta implementar la funcionalidad
    formData[key] = value;
  };

  return {
    view: () =>
      m(Layout, [
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "500px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            },
          },
          [
            m("img", {
              src: "imagenes/logoRecortado.webp",
              alt: "Logo",
              style: {
                width: "auto",
                height: "150px",
              },
            }),
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
              "Iniciar Sesión"
            ),
            m(
              "form",
              {
                style: {
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                },
                onsubmit: handleSubmit,
              },
              [
                m(
                  "label",
                  {
                    for: "usuario",
                    style: {
                      color: modoOscuroOff ? "black" : "white",
                      fontSize: fontSizeh3,
                    },
                  },
                  "Usuario"
                ),
                m("input", {
                  type: "text",
                  id: "usuario",
                  placeholder: "Introduce tu usuario",
                  value: formData.usuario,
                  required: true,
                  oninput: (e) => handleInputChange("usuario", e.target.value),
                  style: {
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "30px",
                    border: "2px solid #ccc",
                    boxSizing: "border-box",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = "none";
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: (e) => {
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.outline = "none";
                    e.target.style.color = "black";
                    e.target.style.border = "2px solid #ccc";
                  },
                }),
                m(
                  "label",
                  {
                    for: "contraseña",
                    style: {
                      color: modoOscuroOff ? "black" : "white",
                      fontSize: fontSizeh3,
                    },
                  },
                  "Contraseña"
                ),
                m(
                  "div",
                  {
                    style: {
                      position: "relative",
                      width: "100%",
                    },
                  },
                  [
                    m("input", {
                      type: "password",
                      id: "contraseña",
                      placeholder: "Introduce tu contraseña",
                      value: formData.contraseña,
                      required: true,
                      oninput: (e) =>
                        handleInputChange("contraseña", e.target.value),
                      style: {
                        width: "100%",
                        padding: "0.8rem",
                        borderRadius: "30px",
                        border: "2px solid #ccc",
                        boxSizing: "border-box",
                        paddingRight: "3rem",
                      },
                      onfocus: (e) => {
                        e.target.style.backgroundColor = backgroundColorButton;
                        e.target.style.outline = "none";
                        e.target.style.color = modoOscuroOff
                          ? "black"
                          : "white";
                        e.target.style.border = `2px solid ${accentColor}`;
                      },
                      onblur: (e) => {
                        e.target.style.backgroundColor = "#FFFFFF";
                        e.target.style.outline = "none";
                        e.target.style.color = "black";
                        e.target.style.border = "2px solid #ccc";
                      },
                    }),
                  ]
                ),
                m(Button, `${loading ? "Cargando..." : "Iniciar Sesión"}`),
                m(
                  "p",
                  {
                    style: {
                      fontSize: fontSizeh2,
                      textAlign: "center",
                      color: accentColor,
                    },
                  },
                  error === "Invalid email"
                    ? "Usuario debe ser un email."
                    : error === "Invalid email or password"
                      ? "Usuario o contraseña erróneos."
                      : error
                ),
              ]
            ),
          ]
        ),
      ]),
  };
}
