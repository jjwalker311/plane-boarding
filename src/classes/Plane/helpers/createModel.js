function createRow(rows, content) {
  return new Array(rows).fill(content);
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

  return new Array(3 + (seatsPerRow * 2)).fill(createRow(rows * 2));
}

module.exports = createModel;
