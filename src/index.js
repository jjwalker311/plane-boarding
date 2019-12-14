const Plane = require('./classes/Plane');
const doDelay = require('./helpers/doDelay');

const args = new Set(process.argv.slice(2));

const RUN_TESTS = args.has('--test');
const HEADLESS_MODE = args.has('--headless') || RUN_TESTS;
const TESTS_TO_RUN = 1000;

let minValue = null;
let maxValue = null;

async function board() {
  const plane = new Plane(20, 3);
  let count = 0;

  plane.boardPassenger();
  if (!HEADLESS_MODE) plane.draw();

  while (!plane.boardingComplete) {
    if (!HEADLESS_MODE) await doDelay(100);
    plane.action();
    if (!HEADLESS_MODE) plane.draw();
    count += 1;
  }

  return Promise.resolve(count);
}

async function testSuite() {
  for (let i = 0; i < TESTS_TO_RUN; i += 1) {
    const value = await board();

    if (!minValue) {
      minValue = value;
      maxValue = value;
    } else {
      // Updating max and mins
      if (value < minValue) minValue = value;
      if (value > maxValue) maxValue = value;
    }
  }

  console.log('MIN - ', minValue);
  console.log('MAX - ', maxValue);
}

if (RUN_TESTS) {
  testSuite();
} else {
  board();
}
