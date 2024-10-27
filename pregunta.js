function corazon() {
  // Definir el patrón de corazón con asteriscos en un array de strings
  const heartPattern = [
    "  ***     ***  ",
    "*****   *****",
    "******* *******",
    " ************* ",
    "   *********   ",
    "    *******    ",
    "     *****     ",
    "      ***      ",
    "       *       ",
  ];

  // Combinar el array en una cadena con saltos de línea y mostrarlo
  document.getElementById("output").textContent = heartPattern.join("\n");
}
