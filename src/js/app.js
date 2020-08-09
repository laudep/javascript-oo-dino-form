import "core-js/stable";
import "regenerator-runtime/runtime";

import Utils from "./utils";
import { Animal, Human, Dino, Bird } from "./animals";
import { HUMAN_IMAGE, HUMAN_SOUND } from "./constants";

/**
 * @description Asynchronously loads Dino data
 * @returns {array} dinosaur data
 */
const getDinoData = async () =>
  await fetch("dino.json")
    .then((res) => res.json())
    .then((data) => data.Dinos)
    .catch((err) => alert("Dino data could not be loaded."));

/**
 * @description Use IIFE to get human data from form and use it to instantiate a Human object
 * @param {string} fact a fact concerning the human person
 * @returns {Human} new Human object
 */
const getHumanData = (fact) => {
  const human = (function () {
    const weight = document.getElementById("weight").value;
    const mainLength = document.getElementById("feet").value;
    const subLength = document.getElementById("inches").value;

    // convert if necessary/metric units are selected
    const isMetric = isMetricUnitSelected();
    const height = isMetric
      ? Utils.centimetersToInches(mainLength * 100 + subLength)
      : Utils.feetAndInchesToInches(mainLength, subLength);

    return new Human(
      document.getElementById("name").value,
      isMetric ? Utils.kilogramsToPounds(weight) : weight,
      height,
      document.getElementById("diet").value,
      fact,
      HUMAN_IMAGE,
      HUMAN_SOUND
    );
  })();
  return human;
};

/**
 * @description Generate the HTML string for a tile
 * @param {string} titleText the tile's title text
 * @param {string} subText the tile's subtext
 * @param {string} image path of image to be displayed in tile
 * @param {string} sound path of sound to be played on click
 * @returns {string} HTML string for the tile
 */
const getTileHtml = (titleText, subText, image, sound) =>
  `<div class="grid-item">
    <h3>${titleText}</h3>
    <img src="${image}" 
      onclick="(function () {
        const audio = document.getElementById('sound-effect');
        audio.pause();
        audio.currentTime = 0;
        audio.src = '${sound}';
        audio.volume = 0.1;
        audio.play();
    }());"/>
    <p>${subText}</p>
</div>`;

/**
 * @description Generate the HTML for the comparison page
 * @param {Array.<Dino>} dinos the dino objects
 * @param {Human} human the current Human object
 * @returns {string} HTML string for comparison page
 */
const generateHTML = async (dinos, human) => {
  // generate dino tiles
  const tiles = dinos.map((dino) =>
    getTileHtml(dino.species, dino.getRandomFact(human), dino.image, dino.sound)
  );

  Utils.shuffleArray(tiles);

  // generate human tile
  // generate compliment to use as a 'fact' for the human tile
  const compliment = await Utils.generateCompliment();
  const humanTile = getTileHtml(
    human.name,
    compliment,
    human.image,
    human.sound
  );

  // add human tile in the middle of the dinosaurs tiles
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
  const grid = document.getElementById("grid");

  grid.innerHTML += await generateHTML(dinos, human);
};

/**
 * @description Remove the comparison form from the screen
 */
const hideForm = () =>
  (document.getElementById("dino-compare").style.display = "none");

/**
 * @description Prepare and display infographic
 * @param {Event} [event] the submit event
 */
const displayInfoGraphic = async (event) => {
  if (event) {
    event.preventDefault();
  }

  const compliment = await Utils.generateCompliment();
  const human = getHumanData(compliment);

  const dinos = [];
  // Get dino data
  getDinoData().then((dinoData) => {
    for (const entry of dinoData) {
      entry.image = `./images/${entry.species.toLowerCase()}.png`;
      entry.sound = `./sounds/${entry.species.toLowerCase()}.wav`;

      dinos.push(
        entry.species.toLowerCase() === "pigeon"
          ? // Create Dino Objects
            new Bird(entry)
          : new Dino(entry)
      );
    }

    addTilesToDOM(dinos, human);
    hideForm();
  });
};

/**
 * @description Whether metric units are selected
 * @returns {boolean} whether metric units are selected
 */
const isMetricUnitSelected = () =>
  document.getElementById("unit-select").value === "metric";

/**
 * @description Handles unit changes (metric & imperial)
 */
const setUnits = (e) => {
  const isMetric = isMetricUnitSelected();

  document.getElementById("label-height-main").innerText = isMetric
    ? "Meter: "
    : "Feet: ";

  document.getElementById("label-height-sub").innerText = isMetric
    ? "centimeters: "
    : "inches: ";

  document.getElementById("label-weight").innerText = isMetric ? "kg" : "lbs";
};

// On button click, prepare and display infographic
document.getElementById("dino-compare").onsubmit = displayInfoGraphic;
// Handle unit changes
document.getElementById("unit-select").onchange = setUnits;
