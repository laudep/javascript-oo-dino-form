/**
 * Singleton utility class
 */
const Utils = {
  /**
   * @description Randomly shuffle a given array
   * @param {array} array the array to shuffle
   */
  shuffleArray: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  },

  /**
   * @description Generates a random (integer) number within a given range
   * @param {number} max the maximum number (inclusive)
   * @param {number} [min=0] the minimum number (inclusive)
   * @returns {number} the generated random integer
   */
  getRandomNumber: (max, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min,

  /**
   * @description  Converts a given length in feet and inches to a total length in inches
   * @param {number} feet length in feet
   * @param {number} inches length in feet
   * @returns {number} the total length in inches
   */
  feetAndInchesToInches: (feet, inches) =>
    parseFloat(feet * 12) + parseFloat(inches),

  /**
   * @description Converts a given weight in kilograms to pounds
   * @param {number} kg weight in kilograms
   * @returns {number} converted weight in pounds (lbs)
   */
  kilogramsToPounds: (kg) => kg * 2.2046,

  /**
   * @description  Converts a given length in centimeters to inches
   * @param {number} cm length in centimeters
   * @returns {number} converted length in inches
   */
  centimetersToInches: (cm) => cm * 0.3937,

  /**
   * @description Generates a compliment string using the Complimentr API
   *
   * @async
   * @returns {string} the generated compliment
   * @see {@link https://complimentr.com|Complimentr website}
   */
  generateCompliment: async () => {
    let compliment = await fetch("https://complimentr.com/api")
      .then((response) => response.json())
      // add a trailing period to the sentence
      .then((data) => `${data.compliment}.`)
      // return sentence with first letter in uppercase
      .then((text) => text.charAt(0).toUpperCase() + text.slice(1))
      .catch((e) => "");

    return compliment;
  },
};

export default Utils;
