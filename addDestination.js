export function addDestination(event) {
    event.preventDefault();

    // Create a new destination object
    const newDestination = {
        destinationCode: document.getElementById("destinationCode").value,
        destinationName: document.getElementById("destinationName").value,
        airportName: document.getElementById("airportName").value,
        airportUrl: document.getElementById("airportUrl").value,
        imageName: document.getElementById("imageUrl").value,
    };

    // Fetch existing destinations from localStorage or initialize an empty array
    const destinations = JSON.parse(localStorage.getItem("destinations")) || [];

    // Add the new destination to the array
    destinations.push(newDestination);

    // Save the updated destinations back to localStorage
    localStorage.setItem("destinations", JSON.stringify(destinations));

    // Redirect back to the destination management page
    alert("Destination added successfully!");
    window.location.href = "manageDestination.html";
}

// Attach event listener for form submission
document.getElementById("addDestinationForm").onsubmit = addDestination;
