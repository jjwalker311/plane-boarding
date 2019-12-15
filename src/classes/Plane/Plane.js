// Classes
const Passenger = require('../Passenger');

// Helpers
const draw = require('./helpers/draw');
const createModel = require('./helpers/createModel');
const createTickets = require('./helpers/createTickets');
const shuffle = require('../../helpers/shuffle');

// const doDelay = require('../../helpers/doDelay');

class Plane {
  constructor(rows, seatsPerRow) {
    this.rows = rows;
    this.seatsPerRow = seatsPerRow;

    // Model of seats and aisle on the plane
    this.model = createModel(this.rows, this.seatsPerRow);
    // Array of passengers on the plane
    this.passengers = [];

    this.ticketSnapshot = shuffle(createTickets(this.rows, this.seatsPerRow));

    this.tickets = JSON.parse(JSON.stringify(this.ticketSnapshot));

    this.boardingPosition = [
      // X value, always zero
      0,
      // Y value, depends on number of seats
      this.seatsPerRow + 1,
    ];

    this.isPositionOccupied = this.isPositionOccupied.bind(this);
    this.isPassengerLoading = this.isPassengerLoading.bind(this);
  }

  get boardingComplete() {
    return this.passengers.every(passenger => passenger.inSeat === true);
  }

  /**
   * Is boarding location free?
   */
  get canNewPassengerBoard() {
    return !(this.isPositionOccupied(...this.boardingPosition));
  }

  get nextSeatNumber() {
    // No more seat numbers
    if (!this.tickets.length) return null;

    return this.tickets.pop();
  }

  /**
   * Is a given position takem
   * @param  {Number} x
   * @param  {Number} y
   */
  isPositionOccupied(x, y) {
    return this.passengers.some(p => p.x === x && p.y === y);
  }

  isPassengerLoading(x, y) {
    const passenger = this.passengers.find(p => p.x === x && p.y === y);

    return passenger.isLoadingLuggage;
  }

  boardPassenger() {
    const seatNumber = this.nextSeatNumber;
    if (seatNumber) {
      const passenger = new Passenger(...this.boardingPosition, seatNumber);
      // Bump everyone on a position
      this.passengers.push(passenger);
    }
  }

  action() {
    // Move all passengers forward
    for (const passenger of this.passengers) {
      // Move each passenger
      passenger.move(this.isPositionOccupied);
    }

    // There's space for new passenger to board
    // AND there's still passengers to come
    if (this.canNewPassengerBoard && this.tickets.length) this.boardPassenger();
  }

  draw() {
    draw(this.model, this.isPositionOccupied, this.isPassengerLoading);
  }
}

module.exports = Plane;
