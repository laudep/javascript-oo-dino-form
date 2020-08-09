import Utils from "./utils";

/**
 * @class for Animals
 */
function Animal(
  species,
  weight,
  height,
  diet,
  where,
  when,
  fact,
  image,
  sound
) {
  this.species = species;
  this.name = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = image;
  this.sound = sound;
}

/**
 * Getter for the fact property
 * @returns {string} the animal's main fact
 */
Animal.prototype.getFact = function () {
  return this.fact;
};

/**
 * Weight comparison method
 * @param {Animal} compareTo animal to which to compare weight
 * @returns {string} comparison result in a sentence
 */
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

/**
 * Height comparison method
 * @param {Animal} compareTo animal to which to compare height
 * @returns {string} comparison result in a sentence
 */
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

/**
 * Diet comparison method
 * @param {Animal} compareTo animal to which to compare diet
 * @returns {string} comparison result in a sentence
 */
Animal.prototype.compareDiet = function (compareTo) {
  return `The ${this.species} was a ${this.diet}${
    this.diet.toLowerCase() === compareTo.diet.toLowerCase() ? " too" : ""
  }.`;
};

/**
 * Returns a random fact about the animal,
 * possibly using a comparison to another animal
 * @param {Animal} [comparisonAnimal] animal to which to compare
 * @returns {string} a random fact about the animal
 */
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

/**
 * @class for Humans
 */
function Human(name, weight, height, diet, fact, image, sound = "") {
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
    image,
    sound
  );
  this.name = name;
}
Human.prototype = Object.assign(Object.create(Animal.prototype), {
  /**
   * Returns a fact when available
   * @returns {string} a fact about the human
   */
  getRandomFact: function () {
    return this.getFact();
  },
});
Human.prototype.constructor = Human;

/**
 * @class for Dinos
 */
function Dino({
  species,
  weight,
  height,
  diet,
  where,
  when,
  fact,
  image,
  sound,
}) {
  Animal.call(
    this,
    species,
    weight,
    height,
    diet,
    where,
    when,
    fact,
    image,
    sound
  );
}
Dino.prototype = Object.assign(Object.create(Animal.prototype));
Dino.prototype.constructor = Dino;

/**
 * @class for Birds
 */
function Bird(properties) {
  Dino.call(this, properties);
}
Bird.prototype = Object.assign(Object.create(Dino.prototype), {
  /**
   * Returns a fact when available
   * @returns {string} a fact about the bird
   */
  getRandomFact: function () {
    return this.getFact();
  },
});
Bird.prototype.constructor = Bird;

export { Animal, Human, Dino, Bird };
