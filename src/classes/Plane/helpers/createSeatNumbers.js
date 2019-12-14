
const { ROW_MAPPING } = require('../../../constants');

/**
 * @param  {Number} rows
 * @param  {Number} seatsPerRow
 * @returns {Array}
 */
function createSeatNumbers(rows, seatsPerRow) {
  const seatNumbers = [];
  for (let x = 0; x < rows; x += 1) {
    // Iterate along plane
    for (let y = 0; y < seatsPerRow * 2; y += 1) {
      const seatNumber = `${(x + 1)}${ROW_MAPPING[y]}`;

      // Iterates across plane
      seatNumbers.push({
        x,
        y: y + (y >= seatsPerRow ? 2 : 1),
        seatNumber,
        rawX: x,
        rawY: y,
      });
    }
  }

  return seatNumbers;
}

module.exports = createSeatNumbers;
