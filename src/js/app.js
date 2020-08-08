import "core-js/stable";
import "regenerator-runtime/runtime";

import Utils from "./Utils";
import { Animal, Human, Dino, Bird } from "./animals";

/**
 * Asynchronously loads Dino data
 * @returns {array} dinosaur data
 */
const getDinoData = async () =>
  await fetch("dino.json")
    .then((res) => res.json())
    .then((data) => data.Dinos)
    .catch((err) => alert("Dino data could not be loaded."));

const dinos = [];
// Get Dino data
getDinoData().then((dinoData) => {
  for (const entry of dinoData) {
    entry.image = `./images/${entry.species.toLowerCase()}.png`;

    dinos.push(
      entry.species.toLowerCase() === "pigeon"
        ? // Create Dino Objects
          new Bird(entry)
        : new Dino(entry)
    );
  }
});

/**
 * Use IIFE to get human data from form and use it to instantiate a Human object
 * @param {string} fact a fact concerning the human person
 * @returns {Human} new Human object
 */
function getHumanData(fact) {
  const human = (function () {
    const HUMAN_IMAGE = "./images/human.png";

    let feet = document.getElementById("feet").value;
    let inches = document.getElementById("inches").value;

    return new Human(
      document.getElementById("name").value,
      document.getElementById("weight").value,
      Utils.feetAndInchesToInches(feet, inches),
      document.getElementById("diet").value,
      fact,
      HUMAN_IMAGE
    );
  })();
  return human;
}

/**
 * Generate the HTML string for a tile
 * @param {string} titleText the tile's title text
 * @param {string} subText the tile's subtext
 * @param {string} image path of image to be displayed in tile
 * @returns {string} HTML string for the tile
 */
const getTileHtml = (titleText, subText, image) => `
<div class="grid-item">
    <h3>${titleText}</h3>
    <img src="${image}" />
    <p>${subText}</p>
</div>
`;

/**
 * Generate the HTML for the comparison page
 * @param {Array.<Dino>} dinos the dino objects
 * @param {Human} human the current Human object
 * @returns {string} HTML string for comparison page
 */
const generateHTML = async (dinos, human) => {
  // generate dino tiles
  const tiles = dinos.map((dino) =>
    getTileHtml(dino.species, dino.getRandomFact(human), dino.image)
  );

  Utils.shuffleArray(tiles);

  // generate human tile
  const compliment = await Utils.generateCompliment();
  const humanTile = getTileHtml(human.name, compliment, `${human.image}`);

  // add Human tile in the middle of the dinosaurs tile
  tiles.splice(tiles.length / 2, 0, humanTile);

  // return a HTML string containing all tiles combined
  return tiles.join("");
};

/**
 * Generate list of tiles and add them to the DOM
 * @param {Array.<Dino>} dinos the dino objects
 * @param {Human} human the current Human object
 */
const addTilesToDOM = async (dinos, human) => {
  document.getElementById("grid").innerHTML = await generateHTML(dinos, human);
};

/**
 * Remove the comparison form from the screen
 */
const hideForm = () =>
  (document.getElementById("dino-compare").style.display = "none");

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", async () => {
  const compliment = await Utils.generateCompliment();
  const human = getHumanData(compliment);
  addTilesToDOM(dinos, human);
  hideForm();
});
