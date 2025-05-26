export const fontSizeh1 = "50px";
export const fontSizeh2 = "35px";
export const fontSizeh3 = "20px";

export const backgroundColorButton = "#BF0F1E3D";
export const accentColor = "#D42635";
export const blackColor = "#1B1B1B";

export let modoOscuroOff =
  JSON.parse(localStorage.getItem("modoOscuro")) || false;

export const updateModoOscuro = () => {
  modoOscuroOff = JSON.parse(localStorage.getItem("modoOscuro")) || false;
};
