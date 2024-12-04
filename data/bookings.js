// In-memory storage for bookings
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

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