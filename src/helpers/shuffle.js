/* eslint-disable no-param-reassign */

/**
 * Takes arrays and shuffles it
 * @param  {Array} myArray
 * @returns {Array}
 */
function shuffle(myArray) {
  let currentIndex = myArray.length; let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = myArray[currentIndex];
    myArray[currentIndex] = myArray[randomIndex];
    myArray[randomIndex] = temporaryValue;
  }

  return myArray;
}

module.exports = shuffle;
