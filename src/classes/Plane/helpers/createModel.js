function createRow(content, rows) {
  return new Array(rows).fill(content);
}

function makeBlockOfSeats(rows, seatsPerRow) {
  const blockOfSeats = [];

  for (let i = 0; i < seatsPerRow; i += 1) {
    const seats = createRow('(', rows);
    blockOfSeats.push(seats);
  }

  return blockOfSeats;
}

function createModel(rows, seatsPerRow) {
  // Creates model that looks like this
  // _______________________________
  // A  (  (  (  (  (  (  (  (  (  (
  // B  (  (  (  (  (  (  (  (  (  (
  // C  (  (  (  (  (  (  (  (  (  (
  // ===============================
  // D  (  (  (  (  (  (  (  (  (  (
  // E  (  (  (  (  (  (  (  (  (  (
  // F  (  (  (  (  (  (  (  (  (  (
  // _______________________________

  const wall = createRow('_', rows);
  const leftSeats = makeBlockOfSeats(rows, seatsPerRow);
  const rightSeats = makeBlockOfSeats(rows, seatsPerRow);
  const aisle = createRow('=', rows);

  return [
    wall,
    ...leftSeats,
    aisle,
    ...rightSeats,
    wall,
  ];
}

module.exports = createModel;
