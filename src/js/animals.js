import Utils from "./Utils";

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
    return `The ${this.species} was only ${Math.max(ratio * 100, 1)
      .toString()
      .substring(0, 2)}% as heavy as ${comparisonName}.`;
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
    return `The ${this.species} was only ${Math.max(ratio * 100, 1)
      .toString()
      .substring(0, 2)}% as tall as ${comparisonName}.`;
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

  // array with all possible fact returning functions
  const factFunctions = [
    this.getFact,
    this.compareWeight,
    this.compareHeight,
    this.compareDiet,
  ];

  // call a random fact returning function
  const randomIndex = Utils.getRandomNumber(factFunctions.length - 1);
  return factFunctions[randomIndex].call(this, comparisonAnimal);
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
  this.name = name;
}
Human.prototype = Object.assign(Object.create(Animal.prototype), {
  getRandomFact: function () {
    return this.getFact();
  },
});
Human.prototype.constructor = Human;

function Dino({ species, weight, height, diet, where, when, fact, image }) {
  Animal.call(this, species, weight, height, diet, where, when, fact, image);
}
Dino.prototype = Object.assign(Object.create(Animal.prototype));
Dino.prototype.constructor = Dino;

function Bird(properties) {
  Dino.call(this, properties);
}
Bird.prototype = Object.assign(Object.create(Dino.prototype), {
  getRandomFact: function () {
    return this.getFact();
  },
});
Bird.prototype.constructor = Bird;

export { Animal, Human, Dino, Bird };
