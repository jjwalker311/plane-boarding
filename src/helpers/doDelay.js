/**
 * Returns a promise than resolves after XXX ms
 * @param  {Number} ms
 * @returns {Promise}
 */
function doDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = doDelay;
