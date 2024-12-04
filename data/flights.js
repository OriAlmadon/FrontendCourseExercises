// In-memory storage for flights
const flights = JSON.parse(localStorage.getItem('flights')) || [
    {
        flightNo: "NYC123",
        origin: "New York",
        destination: "London",
        boardingDate: "2024-12-10",
        boardingTime: "08:00",
        arrivalDate: "2024-12-10",
        arrivalTime: "20:00",
        numSeats: 200
    },
    {
        flightNo: "LHR789",
        origin: "London",
        destination: "Paris",
        boardingDate: "2024-12-12",
        boardingTime: "09:30",
        arrivalDate: "2024-12-12",
        arrivalTime: "11:00",
        numSeats: 180
    }
];

// Save flights to local storage
function saveFlights() {
    localStorage.setItem('flights', JSON.stringify(flights));
}

// Validate flight details
function validateFlight(flight) {
    const errors = [];

    // Check unique flight number
    if (flights.some(existing => existing.flightNo === flight.flightNo)) {
        errors.push('Flight number already exists.');
    }

    // Check origin and destination
    if (flight.origin === flight.destination) {
        errors.push('Origin and destination must be different.');
    }

    // Check boarding date and time
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const boardingDate = new Date(flight.boardingDate);

    if (boardingDate < today) {
        errors.push('Boarding date must be after today.');
    }

    // Check arrival date and time
    const arrivalDate = new Date(flight.arrivalDate);
    if (
        arrivalDate < boardingDate ||
        (arrivalDate.getTime() === boardingDate.getTime() &&
            flight.arrivalTime <= flight.boardingTime)
    ) {
        errors.push('Arrival date and time must be after boarding.');
    }

    // Check number of seats
    if (flight.numSeats <= 0) {
        errors.push('Number of seats must be greater than zero.');
    }

    return errors;
}
