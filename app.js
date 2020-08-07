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

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen
hideForm = () =>
  (document.getElementById("dino-compare").style.display = "none");

// On button click, prepare and display infographic
