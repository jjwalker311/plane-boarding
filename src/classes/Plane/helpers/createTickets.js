
const { ROW_MAPPING } = require('../../../constants');

/**
 * Is seat on the window?
 * @param  {Number} seatNumber
 * @param  {Number} seatsPerRow
 */
function isWindowSeat(seatNumber, seatsPerRow) {
  return (seatNumber === 1) || (seatNumber === (seatsPerRow * 2 + 1));
}

/**
 * @param  {Number} rows
 * @param  {Number} seatsPerRow
 * @returns {Array}
 */
function createTickets(rows, seatsPerRow) {
  const seatNumbers = [];
  for (let x = 0; x < rows; x += 1) {
    // Iterate along plane
    for (let y = 0; y < seatsPerRow * 2; y += 1) {
      const seatNumber = `${(x + 1)}${ROW_MAPPING[y]}`;

      const seat = y + (y >= seatsPerRow ? 2 : 1);
      const rowNumber = x * 2;

      // Iterates across plane
      seatNumbers.push({
        x: rowNumber,
        y: seat,
        seatNumber,
        windowSeat: isWindowSeat(seat, seatsPerRow),
      });
    }
  }

  return seatNumbers;
}

module.exports = createTickets;
