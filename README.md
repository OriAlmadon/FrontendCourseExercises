Ono Air - Flight Management System
Ono Air is a web-based flight management system designed for both administrators and users. Administrators can manage flights and destinations, while users can book flights and manage their bookings. The system includes comprehensive validations and a dynamic user interface.

Project Structure
OnoAir/
│
├── index.html                    # Homepage for Ono Air
├── admin-add-flight.html         # Admin page for adding flights
├── admin-manage-flights.html     # Admin page to manage flights
├── user-book-flight.html         # User page to book a flight
├── user-manage-bookings.html     # User page to manage bookings
├── help.html                     # Help page for user guidance
│
├── data/                         # Folder for storing scripts and in-memory data
│   ├── flights.js                # Script for flight data and validations
│   ├── bookings.js               # Script for booking data and validations
│   ├── destinations.js           # Script for destinations data
│

Features
Administrator Functionality
Manage Flights:

View all flights in a dynamic table.
Add new flights with comprehensive validations:
Unique flight numbers.
Valid date and time logic.
Ensure origin and destination are different.
Number of seats must be greater than 0.

Manage Destinations:

Add new destinations dynamically.
View existing destinations.
User Functionality
Book a Flight:

View available flights in a dynamic table.

Book a flight by specifying:

Number of passengers.
Passenger details (name and passport number).
Comprehensive validations:
No empty fields.
Unique passport numbers per booking.
Passenger count cannot exceed available seats.
Manage Bookings:

View all bookings dynamically.
See flight details along with passenger information.

Help Page

Provides detailed instructions on how to use the system.

Validations
Flight Validations
Unique flight number.
Boarding date after today.
Arrival date and time must be after boarding.
Origin and destination must be different.
Number of seats must be greater than zero.

Booking Validations
Number of passengers must be greater than zero.
All passenger fields (name and passport) must be filled.
Passport numbers must be unique within a booking.
Passenger count cannot exceed available seats.

How to Use
Setup
Clone or download the repository.
Open index.html in a browser to start using the system.
Administrator Guide
Navigate to "Admin - Manage Flights" to view and manage flights.
Use "Admin - Manage Destinations" to add and manage destinations.
User Guide
Navigate to "User - Book a Flight" to view available flights and make bookings.
Use "User - Manage Bookings" to view and manage existing bookings.
