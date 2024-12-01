Help & Documentation
This page provides a guide to all the features and technical details of the web app. Use this as a reference for understanding and navigating the application.

Features Overview
Flight Management: Add, view, and manage flights. New flights are dynamically stored and displayed.
Book a Flight: Filter flights by origin and destination, select one, and book it by providing passenger information.
Booking Management: View all bookings made, including flight details, number of passengers, and a destination image.
Dynamic Forms: Forms for passenger details adjust automatically based on the number of passengers entered.
How to Use the Site
1. Manage Flights
Use the Flight Management page to add or view flights. Enter details such as flight number, origin, destination, and time. All added flights appear in a dynamic table.

2. Book a Flight
Navigate to the Book a Flight page to filter and view available flights. Use the "Book" button to proceed to the booking form.

3. Complete a Booking
Fill out the form with the number of passengers, and input their names and passport IDs. Once completed, click "Submit" to save the booking.

4. Manage Bookings
Visit the Booking Management page to see a list of all saved bookings, including flight details, passenger count, and a destination image.

Technical Aspects
1. Local Storage
We use localStorage to save flight and booking data, ensuring it persists across sessions. Example:


const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
bookings.push({
    flight: selectedFlight,
    passengers: passengerDetails
});
localStorage.setItem("bookings", JSON.stringify(bookings));
        
2. Dynamic Content Rendering
Flights and bookings are displayed dynamically using JavaScript. Example:


function renderFlights(flights) {
    const tableBody = document.getElementById("flightTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    flights.forEach(flight => {
        const row = document.createElement("tr");
        row.innerHTML = `
            ${flight.flightNo}
            ${flight.origin}
            ${flight.destination}
            ${flight.boardingDate}
            ${flight.boardingTime}
            ${flight.arrivalDate}
            ${flight.arrivalTime}
            ${flight.numberOfSeats}
            Book
        `;
        tableBody.appendChild(row);
    });
}
        
3. Dynamic Forms
Passenger forms dynamically generate input fields based on the number of passengers entered. Example:


function generatePassengerFields() {
    const numPassengers = parseInt(document.getElementById("numPassengers").value, 10);
    const passengerFieldsDiv = document.getElementById("passengerFields");
    passengerFieldsDiv.innerHTML = "";
    for (let i = 1; i <= numPassengers; i++) {
        passengerFieldsDiv.innerHTML += `
            Passenger ${i} Name:
            

            Passenger ${i} Passport ID:
            

        `;
    }
}
        
4. Filtering
Flights can be filtered by origin and destination using JavaScript’s filter() method. Example:


function applyFilters() {
    const originFilter = document.getElementById("filterOrigin").value.trim().toLowerCase();
    const destinationFilter = document.getElementById("filterDestination").value.trim().toLowerCase();

    const filteredFlights = flights.filter(flight => {
        return (!originFilter || flight.origin.toLowerCase().includes(originFilter)) &&
               (!destinationFilter || flight.destination.toLowerCase().includes(destinationFilter));
    });

    renderFlights(filteredFlights);
}
        
