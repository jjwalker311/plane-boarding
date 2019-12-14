const clear = require('../../../helpers/clear');
const { ROW_MAPPING } = require('../../../constants');

function isAisle(i, totalLength) {
  return i === (totalLength - 1) / 2;
}

function isWindow(i, totalLength) {
  return i === 0 || i === totalLength - 1;
}

function joinWith(i, totalLength) {
  if (isWindow(i, totalLength)) {
    // first or last row
    return '_';
  } if (isAisle(i, totalLength)) {
    // middle row
    return '=';
  }

  return ' ';
}

function draw(model, isPositionOccupied, isPassengerLoading) {
  // Clear previous console
  clear();

  const seatsInRow = (model.length - 3) / 2;

  for (let y = 0; y < model.length; y += 1) {
    const row = model[y];

    const mappedRow = row.map((position, x) => {
      if (isWindow(y, model.length)) {
        return '___';
      }

      const occupied = isPositionOccupied(x, y);
      if (isAisle(y, model.length)) {
        if (occupied) {
          return isPassengerLoading(x, y) ? 'Y==' : '==8';
        }

        // Aisle NOT occupied
        return '===';
      }

      return occupied ? '(o ' : '(  ';
    });

    if (y === 0 || y === model.length - 1 || y === (seatsInRow + 1)) {
      mappedRow.unshift('  ');
    } else if (y <= seatsInRow) {
      // LHS row of seats
      mappedRow.unshift(`${ROW_MAPPING[y - 1]} `);
    } else {
      // RHS row of seats
      mappedRow.unshift(`${ROW_MAPPING[y - 2]} `);
    }

    // eslint-disable-next-line no-console
    console.log(mappedRow.join(joinWith(y, model.length)));
  }
}

module.exports = draw;
