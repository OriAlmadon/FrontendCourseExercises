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
    } , 
    {
        flightNo: "TLV456",
        origin: "Tel Aviv",
        destination: "Berlin",
        boardingDate: "2024-12-15",
        boardingTime: "12:00",
        arrivalDate: "2024-12-15",
        arrivalTime: "16:00",
        numSeats: 150
    },
    {
        flightNo: "BER321",
        origin: "Berlin",
        destination: "New York",
        boardingDate: "2024-12-18",
        boardingTime: "08:00",
        arrivalDate: "2024-12-18",
        arrivalTime: "16:00",
        numSeats: 220
    },
    {
        flightNo: "JFK999",
        origin: "New York",
        destination: "Dubai",
        boardingDate: "2024-12-20",
        boardingTime: "22:30",
        arrivalDate: "2024-12-21",
        arrivalTime: "06:45",
        numSeats: 180
    },
    {
        flightNo: "DXB888",
        origin: "Dubai",
        destination: "Singapore",
        boardingDate: "2024-12-22",
        boardingTime: "14:00",
        arrivalDate: "2024-12-22",
        arrivalTime: "22:30",
        numSeats: 250
    },
    {
        flightNo: "SIN777",
        origin: "Singapore",
        destination: "Tokyo",
        boardingDate: "2024-12-25",
        boardingTime: "10:15",
        arrivalDate: "2024-12-25",
        arrivalTime: "16:30",
        numSeats: 200
    },
    {
        flightNo: "NRT333",
        origin: "Tokyo",
        destination: "Los Angeles",
        boardingDate: "2024-12-28",
        boardingTime: "17:00",
        arrivalDate: "2024-12-28",
        arrivalTime: "08:00",
        numSeats: 300
    },
    {
        flightNo: "LAX222",
        origin: "Los Angeles",
        destination: "Sydney",
        boardingDate: "2024-12-30",
        boardingTime: "20:00",
        arrivalDate: "2024-12-31",
        arrivalTime: "10:30",
        numSeats: 280
    },
    {
        flightNo: "SYD555",
        origin: "Sydney",
        destination: "Tel Aviv",
        boardingDate: "2025-01-02",
        boardingTime: "13:00",
        arrivalDate: "2025-01-03",
        arrivalTime: "06:00",
        numSeats: 240
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
