import {
  modoOscuroOff,
  fontSizeh1,
  fontSizeh2,
  backgroundColorButton,
  accentColor,
  fontSizeh3,
} from "../lib/constants";
import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { getSession } from "../lib/auth";


async function getActividades() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/calendar`,
      {
        credentials: "include",
      }
    );


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    const events = await response.json();


    return events;
  } catch (error) {
    console.error("Error fetching actividades:", error);
    return [];
  }
}


export function Calendario() {  
  let actividades = [];
  let calendar;
  let role = "user";
  return {
    oninit: async () => {
      const session = await getSession();
      role = session.role ?? "user";
      actividades = await getActividades();
      m.redraw();
    },
    oncreate: async () => {
      window.scrollTo(0, 0);
      const calendarEl = document.getElementById("calendar");
      if (calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
          locale: "es",
          firstDay: 1,
          initialView: "dayGridMonth",
          contentHeight: "auto",
          aspectRatio: 1.5,
          buttonText: {
            today: "Hoy",
          },
          headerToolbar: { left: "", center: "title", right: "" },
          footerToolbar: { left: "today", center: "", right: "prev,next" },
          events: await getActividades(),
          eventClick: (info) => {
            const modal = document.getElementById("event-modal");
            document.getElementById("event-title").innerText = info.event.title;
            document.getElementById("event-description").innerText =
              info.event.extendedProps.description || "Sin descripción";
            document.getElementById("event-time").innerText =
              `Horario: ${info.event.extendedProps.hour}`;
            document.getElementById("event-location").innerText =
              `Ubicación: ${info.event.extendedProps.location}`;
            modal.style.display = "block";
            document.getElementById("cerrar-modal")?.focus();
          },
        });
        calendar.render();
      }
    },
    onremove: () => {
      if (calendar) {
        calendar.destroy();
      }
    },


    view: () =>
      m(Layout, [
        m(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: modoOscuroOff ? "black" : "white",
            },
          },
          m(
            "h1",
            {
              style: {
                color: modoOscuroOff ? "black" : "white",
                marginBottom: "1.5vh",
                fontSize: fontSizeh1,
              },
            },
            "Calendario"
          ),
          m("div", {
            id: "calendar",
            style: {
              margin: "0 2%",
            },
          }),
          m(
            Button,
            {
              onclick: () => m.route.set("/AñadirActividad"),
              style: {
                fontSize: fontSizeh2,
                color: modoOscuroOff ? "black" : "white",
                border: "none",
                padding: "0.8rem",
                margin: "2vh auto",
                borderRadius: "30px",
                visibility: role === "admin" ? "visible" : "hidden",
                backgroundColor: backgroundColorButton,
                outline: modoOscuroOff ? "none" : `2px solid ${accentColor}`,
              },
            },
            "Añadir actividad"
          ),
          m(
            "div#event-modal",
            {
              style: {
                display: "none",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: modoOscuroOff ? "white" : "black",
                color: modoOscuroOff ? "black" : "white",
                fontFamily: "monospace",
                borderRadius: "30px",
                padding: "20px",
                zIndex: 9999,
                outline: `2px solid ${accentColor}`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                maxWidth: "400px",
                width: "90%",
              },
            },
            [
              m("h2#event-title", {
                style: {
                  fontSize: fontSizeh2,
                  fontWeight: "bold",
                },
              }),
              m("p#event-description", {
                style: {
                  fontSize: fontSizeh3,
                  marginBottom: "1em",
                },
              }),
              m("p#event-time", {
                style: {
                  fontSize: fontSizeh3,
                  marginBottom: "1em",
                },
              }),
              m("p#event-location", {
                style: {
                  fontSize: fontSizeh3,
                  marginBottom: "1em",
                },
              }),
              m(
                Button,
                {
                  id: "cerrar-modal",
                  onclick: () =>
                    (document.getElementById("event-modal").style.display =
                      "none"),
                },
                "Cerrar"
              ),
            ]
          )
        ),
      ]),
  };
}



