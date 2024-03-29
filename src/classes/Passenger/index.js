class Passenger {
  constructor(x, y, ticket) {
    this.x = x;
    this.y = y;
    this.ticket = ticket;

    this.inSeat = false;

    // 75% chance needs to be put in overhead locker
    this.bagInOverheadLocker = Math.random() > 0.75;

    this.isLoadingLuggage = false;

    // TODO: make this dynamic for how many people to slip past
    this.slippingPastSomeone = -1;
  }

  get windowSeat() {
    return !!this.ticket.windowSeat;
  }

  move(isPositionOccupied) {
    // Do NOTHING if in seat
    if (this.inSeat) return;

    if (this.x < this.ticket.x) {
      // We're still in the aisle
      if (!isPositionOccupied(this.x + 1, this.y)) {
        // is the space in the aisle ahead of us free?
        this.x += 1;
      }
    } else if (this.x === this.ticket.x) {
      // We're in the correct row

      if (!this.bagInOverheadLocker) {
        // Needs to put bag in locker
        this.bagInOverheadLocker = true;
        this.isLoadingLuggage = true;

        // Spends rest of move loading luggage
        return;
      }

      // If we're gotten to this stage, luggage is loaded
      this.isLoadingLuggage = false;

      if (this.slippingPastSomeone === 0) {
        // We have slipped passed someone, go to seat
        this.y = this.ticket.y;

        this.inSeat = true;

        return;
      }

      if (this.slippingPastSomeone > 0) {
        // We ARE slipping passed someone
        this.slippingPastSomeone -= 1;

        return;
      }

      // No one blocking us...
      const turnLeft = this.y > this.ticket.y;

      const nearestSeatInRightDirection = this.y + (turnLeft ? -1 : 1);
      // Is someone in the next seat?
      if (!isPositionOccupied(this.ticket.x, nearestSeatInRightDirection)) {
        // Nope, let's move to it
        this.y = nearestSeatInRightDirection;

        if (this.y === this.ticket.y) {
          // Hoorah, we're in our seat
          this.inSeat = true;
        }
      } else {
        // There's someone in the way to my seat
        // Window seat takes twice as long
        this.slippingPastSomeone = this.windowSeat ? 4 : 2;
      }
    }
  }
}

module.exports = Passenger;
