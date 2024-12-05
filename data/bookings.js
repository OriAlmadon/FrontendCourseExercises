// In-memory storage for bookings
const bookings = JSON.parse(localStorage.getItem('bookings')) || [
    {
        flightNo: "NYC123",
        passengerCount: 2,
        passengerDetails: [
            { name: "John Doe", passport: "A12345678" },
            { name: "Jane Smith", passport: "B98765432" }
        ]
    },
    {
        flightNo: "LHR789",
        passengerCount: 1,
        passengerDetails: [
            { name: "Alice Johnson", passport: "C56789012" }
        ]
    },
    {
        flightNo: "NYC123",
        passengerCount: 3,
        passengerDetails: [
            { name: "Bob Brown", passport: "D34567890" },
            { name: "Charlie Green", passport: "E12345987" },
            { name: "Diana White", passport: "F87654321" }
        ]
    },
    {
        flightNo: "TLV808",
        passengerCount: 2,
        passengerDetails: [
            { name: "David Ben-Gurion", passport: "IL19230123" },
            { name: "Golda Meir", passport: "IL19080322" }
        ]
    },
    {
        flightNo: "TLV909",
        passengerCount: 3,
        passengerDetails: [
            { name: "Theodor Herzl", passport: "IL18600213" },
            { name: "Menachem Begin", passport: "IL19130816" },
            { name: "Yitzhak Rabin", passport: "IL19220301" }
        ]
    },
    {
        flightNo: "TLV010",
        passengerCount: 1,
        passengerDetails: [
            { name: "Chaim Weizmann", passport: "IL18740227" }
        ]
    },
    {
        flightNo: "TLV111",
        passengerCount: 4,
        passengerDetails: [
            { name: "Moshe Dayan", passport: "IL19150520" },
            { name: "Leah Goldberg", passport: "IL19110529" },
            { name: "Yigal Allon", passport: "IL19181010" },
            { name: "Haim Nachman Bialik", passport: "IL18730109" }
        ]
    },
    {
        flightNo: "TLV212",
        passengerCount: 2,
        passengerDetails: [
            { name: "Golda Meir", passport: "IL19080405" },
            { name: "Abba Eban", passport: "IL19150515" }
        ]
    },
    {
        flightNo: "TLV313",
        passengerCount: 3,
        passengerDetails: [
            { name: "Yehuda Amichai", passport: "IL19240503" },
            { name: "Rachel Bluwstein", passport: "IL18900206" },
            { name: "Zalman Shazar", passport: "IL18890124" }
        ]
    },
    {
        flightNo: "TLV414",
        passengerCount: 1,
        passengerDetails: [
            { name: "Shimon Peres", passport: "IL19230802" }
        ]
    }
    
];

// Function to save bookings to local storage
function saveBookings() {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Function to validate booking details
function validateBooking(booking, flight) {
    const errors = [];

    // Check all fields are filled
    if (!booking.passengerCount || booking.passengerCount <= 0) {
        errors.push('Number of passengers must be greater than zero.');
    }

    booking.passengerDetails.forEach((passenger, index) => {
        if (!passenger.name || !passenger.passport) {
            errors.push(`Passenger ${index + 1}: Name and Passport Number are required.`);
        }

        // Validate passport uniqueness
        const duplicates = booking.passengerDetails.filter(p => p.passport === passenger.passport);
        if (duplicates.length > 1) {
            errors.push(`Passenger ${index + 1}: Passport number must be unique.`);
        }
    });

    // Check passenger count doesn't exceed available seats
    if (booking.passengerCount > flight.numSeats) {
        errors.push('Passenger count exceeds available seats for the flight.');
    }

    return errors;
}

// Function to add a new booking
function addBooking(booking, flight) {
    const errors = validateBooking(booking, flight);
    if (errors.length > 0) {
        alert('Please correct the following errors:\n\n' + errors.join('\n'));
        return false;
    }

    bookings.push(booking);
    saveBookings();
    alert('Booking successful!');
    return true;
}
