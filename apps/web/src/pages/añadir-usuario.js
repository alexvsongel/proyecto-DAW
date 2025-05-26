import {
  modoOscuroOff,
  fontSizeh1,
  fontSizeh3,
  accentColor,
  backgroundColorButton,
} from "../lib/constants";
import { getSession } from "../lib/auth";
import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { authClient } from "../lib/auth";

export function AñadirUsuario() {
  let formData = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
      },
      {
        onRequest: (context) => {
          // Mostrar un loader
        },
        onSuccess: (context) => {
          // Redirigir a la pagina de principal
          alert("Usuario añadido con éxito");
          m.route.set("/Inicio");
        },
        onError: (context) => {
          // Mostrar error
          console.error(context.error);
        },
      }
    );
  };

  // Función para actualizar formData cuando cambian los inputs
  const handleInputChange = (key, value) => {
    formData[key] = value;
  };
  return {
    oninit: async () => {
      const session = await getSession();
      if (session.role !== "admin") {
        m.route.set("/Inicio");
        return;
      }
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
          "Añade un usuario"
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
            },
          },
          m(
            "form",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "15px",
              },
              onsubmit: handleSubmit,
            },
            [
              //Name
              m(
                "label",
                {
                  for: "name",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Nombre"
              ),
              m("input", {
                id: "name",
                type: "text",
                required: true,
                placeholder: "Escribe un nombre para tu actividad: ",
                value: formData.name,
                oninput: (e) => handleInputChange("name", e.target.value),
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
              //Email
              m(
                "label",
                {
                  for: "email",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Email"
              ),

              m("input", {
                id: "email",
                type: "email",
                required: true,
                placeholder: "ejemplo@correo.com",
                value: formData.email,
                oninput: (e) => handleInputChange("email", e.target.value),
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
              //Password
              m(
                "label",
                {
                  for: "password",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Contraseña"
              ),

              m("input", {
                id: "password",
                type: "password",
                required: true,
                placeholder: "Introduce tu contraseña",
                value: formData.password,
                oninput: (e) => handleInputChange("password", e.target.value),
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
              //Role
              m(
                "label",
                {
                  for: "role",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Rol"
              ),
              m(
                "select",
                {
                  id: "role",
                  required: true,
                  value: formData.role,
                  onchange: (e) => handleInputChange("role", e.target.value),
                  style: {
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "30px",
                    border: "2px solid #ccc",
                    boxSizing: "border-box",
                  },
                },
                [
                  m(
                    "option",
                    { value: "", disabled: true },
                    "Selecciona un rol"
                  ),
                  m("option", { value: "admin" }, "Admin"),
                  m("option", { value: "user" }, "Usuario"),
                ]
              ),

              m(Button, "Añadir usuario"),
            ]
          )
        ),
      ]),
  };
}
