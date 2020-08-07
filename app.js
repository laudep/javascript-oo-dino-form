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
        ""
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
    const HUMAN_IMAGE = "human.png";

    function getName() {
      return name;
    }

    function getTotalHeightInInches() {
      return parseFloat(feet * 12) + parseFloat(inches);
    }

    function getHeight() {
      return getTotalHeightInInches();
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
Dino.prototype.compareWeight = function (humanWeight) {
  const ratio = Math.floor(this.weight / humanWeight);
  return `The ${this.name} was ${ratio} times as heavy as you.`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (humanHeight) {
  const ratio = Math.floor(this.height / humanHeight);
  return `The ${this.name} was ${ratio} times as tall as you.`;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen
hideForm = () =>
  (document.getElementById("dino-compare").style.display = "none");

// On button click, prepare and display infographic
