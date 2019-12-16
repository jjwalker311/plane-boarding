/* eslint-disable no-console, no-await-in-loop */
const Plane = require('./classes/Plane');
const doDelay = require('./helpers/doDelay');

const args = process.argv.slice(2);
const argsAsSet = new Set(args);

const RUN_TESTS = argsAsSet.has('--test');
const HEADLESS_MODE = argsAsSet.has('--headless') || RUN_TESTS;
const TESTS_TO_RUN = 1000000;

const numberOfRowsArg = args.find(arg => arg.includes('--rows'));
const seatsPerRowArg = args.find(arg => arg.includes('--seats'));

/**
 * Gets value from arg
 * key=value => value
 * @param  {string} string
 */
function getValue(string) {
  return Number(string.split('=')[1]);
}

const ROWS = numberOfRowsArg ? getValue(numberOfRowsArg) : 10;
const SEATS_PER_ROW = seatsPerRowArg ? getValue(seatsPerRowArg) : 3;

let minValue = null;
let maxValue = null;
let ticketCache = null;

async function boardPlane() {
  const plane = new Plane(ROWS, SEATS_PER_ROW);
  let count = 0;

  // Board first passenger
  plane.boardPassenger();

  while (!plane.boardingComplete) {
    if (!HEADLESS_MODE) await doDelay(100);
    plane.action();
    if (!HEADLESS_MODE) plane.draw();
    count += 1;
  }

  return Promise.resolve([count, plane.ticketSnapshot]);
}

async function testSuite() {
  for (let i = 0; i < TESTS_TO_RUN; i += 1) {
    const [value, tickets] = await boardPlane();

    if (!minValue) {
      minValue = value;
      maxValue = value;
    } else {
      // Updating max and mins
      if (value < minValue) {
        minValue = value;
        ticketCache = tickets;
      }

      if (value > maxValue) maxValue = value;
    }
  }

  console.log(ticketCache);
  console.log('MIN - ', minValue);
  console.log('MAX - ', maxValue);
}

if (RUN_TESTS) {
  testSuite();
} else {
  boardPlane();
}
