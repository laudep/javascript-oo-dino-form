// Create Dino Constructor
const getDinoData = async () =>
  await fetch("dino.json")
    .then((res) => res.json())
    .then((data) => data.Dinos)
    .catch((err) => alert("Dino data could not be loaded."));

function Dino(species, weight, height, diet, where, when, fact, image) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = image;
}

// Get Dino data

// Create Dino Objects
const dinos = [];
getDinoData().then((dinoData) => {
  for (const entry of dinoData) {
    dinos.push(
      new Dino(
        entry.species,
        entry.weight,
        entry.height,
        entry.diet,
        entry.where,
        entry.when,
        entry.fact,
        `images/${entry.species.toLowerCase()}.png`
      )
    );
  }
});

console.log(dinos);

// Create Human Object

// Use IIFE to get human data from form

function getHumanData() {
  const human = (function () {
    let name = document.getElementById("name").value;
    let feet = document.getElementById("feet").value;
    let inches = document.getElementById("inches").value;
    let weight = document.getElementById("weight").value;
    let diet = document.getElementById("diet").value;
    const HUMAN_IMAGE = "images/human.png";

    function getName() {
      return name;
    }

    function calculateHeightInInches() {
      return parseFloat(feet * 12) + parseFloat(inches);
    }

    function getHeight() {
      return calculateHeightInInches();
    }

    function getWeight() {
      return parseFloat(weight);
    }

    function getDiet() {
      return diet;
    }

    function getImage() {
      return HUMAN_IMAGE;
    }

    return {
      species: "Human",
      name: getName(),
      height: getHeight(),
      weight: getWeight(),
      diet: getDiet(),
      image: getImage(),
    };
  })();
  return human;
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (humanToCompare) {
  const ratio = (this.weight / humanToCompare.weight).toFixed(2);
  return ratio < 1
    ? `The ${this.species} was only ${ratio * 100}% as heavy as you.`
    : `The ${this.species} was ${Math.floor(ratio)} times as heavy as you.`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (humanToCompare) {
  const ratio = (this.height / humanToCompare.height).toFixed(2);
  return ratio < 1
    ? `The ${this.species} was only ${ratio * 100}% as tall as you.`
    : `The ${this.species} was ${Math.floor(ratio)} times as tall as you.`;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (humanToCompare) {
  return `The ${this.species} was a ${this.diet}${
    this.diet.toLowerCase() === humanToCompare.diet.toLowerCase() ? " too" : ""
  }.`;
};

// Random Dino fact method
Dino.prototype.getRandomFact = function (humanToCompare) {
  if (!humanToCompare) {
    return this.fact;
  }

  if (this.species.toLowerCase() === "pigeon") {
    return this.fact;
  }

  const getRandomNumber = (bound) => Math.floor(Math.random() * bound);

  const getFact = () => this.fact;

  const factFunctions = [
    () => this.fact,
    this.compareWeight,
    this.compareHeight,
    this.compareDiet,
  ];

  return factFunctions[getRandomNumber(factFunctions.length)].call(
    this,
    humanToCompare
  );
};

// Generate Tiles for each Dino in Array
getTileHtml = (titleText, subText, image) => `
<div class="grid-item">
    <h3>${titleText}</h3>
    <img src="${image}" />
    <p>${subText}</p>
</div>
`;

// Add tiles to DOM

// Generate Tiles for each Dino in Array
generateCompliment = async () => {
  let compliment = await fetch("https://complimentr.com/api")
    .then((response) => response.json())
    // add a trailing period to the sentence
    .then((data) => `${data.compliment}.`)
    // return sentence with first letter in uppercase
    .then((text) => text.charAt(0).toUpperCase() + text.slice(1))
    .catch((e) => "");

  return compliment;
};

generateHTML = async (dinos, human) => {
  // generate dino tiles
  const tiles = dinos.map((dino) =>
    getTileHtml(dino.species, dino.getRandomFact(human), dino.image)
  );

  // generate human tile
  const compliment = await generateCompliment();
  const humanTile = getTileHtml(human.name, compliment, `${human.image}`);

  // add Human tile in the middle of the dinosaurs tile
  tiles.splice(tiles.length / 2, 0, humanTile);

  // return a HTML string containing all tiles combined
  return tiles.join("");
};

// Add tiles to DOM
addTilesToDOM = async (dinos, human) => {
  document.getElementById("grid").innerHTML = await generateHTML(dinos, human);
};

// Remove form from screen
hideForm = () =>
  (document.getElementById("dino-compare").style.display = "none");

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", () => {
  const human = getHumanData();
  addTilesToDOM(dinos, human);
  hideForm();
});
