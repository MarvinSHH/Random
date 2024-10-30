function corazon() {
  const heartPattern = [
    "Te amo",
    "  ***     ***  ",
    "*****   *****",
    "******* *******",
    " ************* ",
    "  ***********   ",
    "   *********    ",
    "    *******     ",
    "     ****      ",
    "      **       ",
    "      *       ",
  ];

  document.getElementById("output").textContent = heartPattern.join("\n");
}

let counter = 0;

function toggleContent() {
  const display = document.getElementById("output");
  const youtubePlayer = document.getElementById("youtubePlayer");

  if (counter === 0) {
    display.textContent =
      "Ni todas las estrellas juntas brillan tanto como tú preciosaa!🌟";
  } else if (counter === 1) {
    display.textContent = "Aparte de linda, hermosaaaaaaaaa!❤️";
  } else if (counter === 2) {
    display.textContent =
      "Eres como el sol al amanacerrrrr... iluminas todo a tu alrededor✨";
  } else if (counter === 3) {
    display.textContent = "PD: Te quiero muuuuuuuuuu-chooooooo✨";
  } else if (counter === 4) {
    youtubePlayer.style.display = "block";
  }

  counter = (counter + 1) % 5;
}
