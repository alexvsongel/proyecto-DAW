import {
  modoOscuroOff,
  fontSizeh3,
  fontSizeh1,
  backgroundColorButton,
  accentColor,
} from "../lib/constants";
import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { getSession } from "../lib/auth";

export function Buzon() {
  let session = null;

  let formData = {
    titulo: "",
    ubicacion: "",
    fecha: "",
    horario: "",
    descripcion: "",
  };

  let loading = false;
  let error = "";
  let succes = "";

  const handleInputChange = (key, value) => {
    //Falta implementar la funcionalidad
    formData[key] = value;
  };

  const enviarSugerencia = async (e) => {
    loading = true;
    e.preventDefault();

    if (session === null) {
      loading = false;
      error = "Inicia sesion para continuar.";
      return;
    }

    if (
      formData.titulo === "" ||
      formData.descripcion === "" ||
      formData.horario === "" ||
      formData.fecha === "" ||
      formData.ubicacion === ""
    ) {
      loading = false;
      error = "Por favor completa el formulario.";
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/suggestions`,
      {
        method: "POST",
        body: JSON.stringify({
          user_id: session?.id ?? "null",
          title: formData.titulo,
          start_date: formData.fecha,
          hour: formData.horario,
          location: formData.ubicacion,
          description: formData.descripcion,
        }),
        credentials: "include",
      }
    );

    loading = false;

    if (!response.ok) {
      error = response.text;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Sugerencia añadida correctamente!");
  };

  return {
    oninit: async () => {
      session = await getSession();
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
          "Buzón de sugerencias"
        ),
        m(
          "p",
          {
            style: {
              fontSize: fontSizeh3,
              color: modoOscuroOff ? "black" : "white",
              textAlign: "left",
              margin: "0 auto",
              maxWidth: "800px",
              width: "90%",
              lineHeight: "1.6",
            },
          },
          "¿Tienes una idea genial? ¡Compártela con nosotros!"
        ),
        m(
          "p",
          {
            style: {
              fontSize: fontSizeh3,
              color: modoOscuroOff ? "black" : "white",
              textAlign: "left",
              margin: "0 auto",
              maxWidth: "800px",
              width: "90%",
              lineHeight: "1.6",
            },
          },
          "En esta sección puedes sugerir una actividad que te gustaría hacer rellenando el formulario o ver las sugerencias que tus compañer@s han compartido."
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
            Button,
            { onclick: () => m.route.set("/Sugerencias") },
            "Ver sugerencias"
          ),
          m(
            "form",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "15px",
              },
            },
            [
              m(
                "label",
                {
                  for: "Titulo",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Título"
              ),
              m("input", {
                type: "text",
                required: true,
                placeholder: "Escribe un nombre para tu actividad: ",
                style: {
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                value: formData.titulo,
                oninput: (e) => handleInputChange("titulo", e.target.value),
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
                  for: "ubicacion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Ubicación"
              ),
              m("input", {
                type: "text",
                required: true,
                placeholder: "Escribe donde quieres hacer tu actividad: ",
                value: formData.ubicacion,
                oninput: (e) => handleInputChange("ubicacion", e.target.value),
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
                  for: "fecha",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Fecha: "
              ),
              m("input", {
                id: "ubicacion",
                required: true,
                type: "date",
                placeholder: "Escribe cuando quieres hacer tu actividad: ",
                value: formData.fecha,
                oninput: (e) => handleInputChange("fecha", e.target.value),
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
              //--------------------Horario
              m(
                "label",
                {
                  for: "horario",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Horario: "
              ),
              m("input", {
                id: "horario",
                required: true,
                type: "text",
                placeholder: "Formato: 09:00-15:00",
                value: formData.horario,
                oninput: (e) => handleInputChange("horario", e.target.value),
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
              //--------------------Descripción
              m(
                "label",
                {
                  for: "descripcion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontSize: fontSizeh3,
                  },
                },
                "Descripción"
              ),
              m("textarea", {
                name: "Describe tu actividad: ",
                id: "descripcion",
                required: true,
                value: formData.descripcion,
                oninput: (e) =>
                  handleInputChange("descripcion", e.target.value),
                style: {
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                  minHeight: "150px",
                  resize: "vertical",
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
                Button,
                { type: "submit", onclick: enviarSugerencia },
                "Enviar sugerencia"
              ),
            ]
          )
        ),
      ]),
  };
}
