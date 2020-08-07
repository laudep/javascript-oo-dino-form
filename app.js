// Create Dino Constructor
const getDinoData = async () =>
  await fetch("dino.json")
    .then((res) => res.json())
    .then((data) => data.Dinos)
    .catch((err) => alert("Dino data could not be loaded."));

// class Animal {
//   constructor(species, weight, height, diet, where, when, fact, image) {
//     this.species = species;
//     this.weight = weight;
//     this.height = height;
//     this.diet = diet;
//     this.where = where;
//     this.when = when;
//     this.fact = fact;
//     this.image = image;
//   }
// }

// class Human extends Animal {
//   constructor(name, weight, height, diet, fact, image) {
//     super("Human", weight, height, diet, "World Wide", "Holocene", fact, image);
//   }
// }

function Animal(species, weight, height, diet, where, when, fact, image) {
  this.species = species;
  this.name = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = image;
}

Animal.prototype.getFact = function () {
  return this.fact;
};

Animal.prototype.compareWeight = function (compareTo) {
  const ratio = (this.weight / compareTo.weight).toFixed(2);
  const comparisonName = compareTo.name
    ? compareTo.name
    : "a " + compareTo.species;

  if (Math.round(ratio) === 1) {
    return `The ${this.species} was about as heavy as ${comparisonName}.`;
  } else if (ratio > 1) {
    return `The ${this.species} was about ${Math.round(
      ratio
    )} times as heavy as ${comparisonName}.`;
  } else {
    return `The ${this.species} was only ${Math.max(
      ratio * 100,
      1
    )}% as heavy as ${comparisonName}.`;
  }
};

// NOTE: Weight in JSON file is in lbs, height in inches.
Animal.prototype.compareHeight = function (compareTo) {
  const ratio = (this.height / compareTo.height).toFixed(2);
  const comparisonName = compareTo.name
    ? compareTo.name
    : "a " + compareTo.species;

  if (Math.round(ratio) === 1) {
    return `The ${this.species} was about the same weight as ${comparisonName}.`;
  } else if (ratio > 1) {
    return `The ${this.species} was about ${Math.round(
      ratio
    )} times as tall as ${comparisonName}.`;
  } else {
    return `The ${this.species} was only ${Math.max(
      ratio * 100,
      1
    )}% as tall as ${comparisonName}.`;
  }
};

// NOTE: Weight in JSON file is in lbs, height in inches.
Animal.prototype.compareDiet = function (comparisonAnimal) {
  return `The ${this.species} was a ${this.diet}${
    this.diet.toLowerCase() === comparisonAnimal.diet.toLowerCase()
      ? " too"
      : ""
  }.`;
};

Animal.prototype.getRandomFact = function (comparisonAnimal) {
  if (!comparisonAnimal) {
    return this.getFact();
  }

  //   if (this.species.toLowerCase() === "pigeon") {
  //     return this.getFact();
  //   }

  const getRandomNumber = (bound) => Math.floor(Math.random() * bound);

  const factFunctions = [
    this.getFact,
    this.compareWeight,
    this.compareHeight,
    this.compareDiet,
  ];

  return factFunctions[getRandomNumber(factFunctions.length)].call(
    this,
    comparisonAnimal
  );
};

function Human(name, weight, height, diet, fact, image) {
  const SPECIES = "Human";
  const LOCATION_WORLD_WIDE = "World Wide";
  const TIME_HOLOCENE = "Holocene";

  Animal.call(
    this,
    SPECIES,
    weight,
    height,
    diet,
    LOCATION_WORLD_WIDE,
    TIME_HOLOCENE,
    fact,
    image
  );
}
this.name = name;
Human.prototype.getRandomFact = () => this.getFact();
Human.prototype.setFact = (fact) => (this.fact = fact);
Human.prototype.constructor = Human;

function Dino(species, weight, height, diet, where, when, fact, image) {
  Animal.call(this, species, weight, height, diet, where, when, fact, image);
  Dino.prototype.constructor = Dino;
}

function Bird(species, weight, height, diet, where, when, fact, image) {
  Dino.call(this, species, weight, height, diet, where, when, fact, image);
  Bird.prototype.getRandomFact = () => fact;
  Bird.prototype.constructor = Bird;
}

// Get Dino data

// Create Dino Objects
const dinos = [];
getDinoData().then((dinoData) => {
  for (const entry of dinoData) {
    dinos.push(
      entry.species.toLowerCase() === "pigeon"
        ? new Bird(
            entry.species,
            entry.weight,
            entry.height,
            entry.diet,
            entry.where,
            entry.when,
            entry.fact,
            `images/${entry.species.toLowerCase()}.png`
          )
        : new Dino(
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
function getHumanData(fact) {
  const human = (function () {
    const HUMAN_IMAGE = "images/human.png";

    let name = document.getElementById("name").value;
    let feet = document.getElementById("feet").value;
    let inches = document.getElementById("inches").value;
    let weight = document.getElementById("weight").value;
    let diet = document.getElementById("diet").value;

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

    function getFact() {
      return fact;
    }

    function getImage() {
      return HUMAN_IMAGE;
    }

    return new Human(
      getName(),
      getWeight(),
      getHeight(),
      getDiet(),
      getFact(),
      getImage()
    );
  })();
  return human;
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (humanToCompare) {
  const ratio = (this.weight / humanToCompare.weight).toFixed(2);
  if (Math.round(ratio) === 1) {
    return `The ${this.species} was about as heavy as you.`;
  } else if (ratio > 1) {
    return `The ${this.species} was about ${Math.round(
      ratio
    )} times as heavy as you.`;
  } else {
    return `The ${this.species} was only ${Math.max(
      ratio * 100,
      1
    )}% as heavy as you.`;
  }
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (humanToCompare) {
  const ratio = (this.height / humanToCompare.height).toFixed(2);
  if (Math.round(ratio) === 1) {
    return `The ${this.species} was about the same weight as you.`;
  } else if (ratio > 1) {
    return `The ${this.species} was about ${Math.round(
      ratio
    )} times as tall as you.`;
  } else {
    return `The ${this.species} was only ${Math.max(
      ratio * 100,
      1
    )}% as tall as you.`;
  }
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
document.getElementById("btn").addEventListener("click", async () => {
  const compliment = await generateCompliment();
  const human = getHumanData(compliment);
  addTilesToDOM(dinos, human);
  hideForm();
});
