// Load destinations from localStorage or provide sample data
export function loadDestinations() {
    const destinations = JSON.parse(localStorage.getItem("destinations")) || [
        {
            destinationCode: "TLV",
            destinationName: "Tel Aviv",
            airportName: "Ben Gurion Airport",
            airportUrl: "https://www.iaa.gov.il/en/airports/ben-gurion/",
            imageName: "TelAviv.png"
        },
        {
            destinationCode: "JFK",
            destinationName: "New York",
            airportName: "John F. Kennedy International Airport",
            airportUrl: "https://www.jfkairport.com/",
            imageName: "NewYork.png"
        },
        {
            destinationCode: "LHR",
            destinationName: "London",
            airportName: "Heathrow Airport",
            airportUrl: "https://www.heathrow.com/",
            imageName: "London.png"
        }
    ];

    renderDestinations(destinations);
}

// Render destinations in the table
export function renderDestinations(destinations) {
    const tableBody = document.getElementById("destinationTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows

    destinations.forEach(destination => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${destination.destinationCode}</td>
            <td>${destination.destinationName}</td>
            <td>${destination.airportName}</td>
            <td><a href="${destination.airportUrl}" target="_blank">Visit</a></td>
            <td><img src="images/${destination.imageName}" alt="${destination.destinationName}"></td>
        `;

        tableBody.appendChild(row);
    });
}

// Navigate to the Add Destination page
export function navigateToAddDestination() {
    window.location.href = "addDestination.html";
}

// Load destinations when the page loads
window.onload = loadDestinations;
