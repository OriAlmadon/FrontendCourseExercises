

// Predefined destinations
const destinations = [
    {
        name: "New York",
        imageUrl: "https://example.com/nyc.jpg",
        airportName: "John F. Kennedy International Airport",
        airportWebsite: "https://www.jfkairport.com",
        email: "info@jfkairport.com",
        code: "JFK"
    },
    {
        name: "New York",
        imageUrl: "https://example.com/nyc.jpg",
        airportName: "John F. Kennedy International Airport",
        airportWebsite: "https://www.jfkairport.com",
        email: "info@jfkairport.com",
        code: "JFK"
    },
    {
        name: "London",
        imageUrl: "https://example.com/london.jpg",
        airportName: "Heathrow Airport",
        airportWebsite: "https://www.heathrow.com",
        email: "info@heathrow.com",
        code: "LHR"
    },
    {
        name: "Paris",
        imageUrl: "https://example.com/paris.jpg",
        airportName: "Charles de Gaulle Airport",
        airportWebsite: "https://www.parisaeroport.fr",
        email: "info@parisaeroport.fr",
        code: "CDG"
    },
    {
        name: "Tokyo",
        imageUrl: "https://example.com/tokyo.jpg",
        airportName: "Narita International Airport",
        airportWebsite: "https://www.narita-airport.jp",
        email: "info@narita-airport.jp",
        code: "NRT"
    },
    {
        name: "Sydney",
        imageUrl: "https://example.com/sydney.jpg",
        airportName: "Sydney Kingsford Smith Airport",
        airportWebsite: "https://www.sydneyairport.com.au",
        email: "info@sydneyairport.com.au",
        code: "SYD"
    },
    {
        name: "Dubai",
        imageUrl: "https://example.com/dubai.jpg",
        airportName: "Dubai International Airport",
        airportWebsite: "https://www.dubaiairports.ae",
        email: "info@dubaiairports.ae",
        code: "DXB"
    },
    {
        name: "Singapore",
        imageUrl: "https://example.com/singapore.jpg",
        airportName: "Changi Airport",
        airportWebsite: "https://www.changiairport.com",
        email: "info@changiairport.com",
        code: "SIN"
    },
    {
        name: "Los Angeles",
        imageUrl: "https://example.com/la.jpg",
        airportName: "Los Angeles International Airport",
        airportWebsite: "https://www.flylax.com",
        email: "info@flylax.com",
        code: "LAX"
    },
    {
        name: "Hong Kong",
        imageUrl: "https://example.com/hk.jpg",
        airportName: "Hong Kong International Airport",
        airportWebsite: "https://www.hongkongairport.com",
        email: "info@hongkongairport.com",
        code: "HKG"
    },
    {
        name: "Berlin",
        imageUrl: "https://example.com/berlin.jpg",
        airportName: "Berlin Brandenburg Airport",
        airportWebsite: "https://ber.berlin-airport.de",
        email: "info@berlin-airport.de",
        code: "BER"
    }
    // Add other predefined destinations here
];

const form = document.getElementById('destinationForm');
const destinationsList = document.getElementById('destinations');

// Function to render destinations
function renderDestinations() {
    if (!destinationsList) return; // If on a page without destinationsList
    destinationsList.innerHTML = '';
    destinations.forEach((destination) => {
        const li = document.createElement('li');
        li.textContent = `Name: ${destination.name}, Code: ${destination.code}, Airport: ${destination.airportName}`;
        destinationsList.appendChild(li);
    });
}

// Function to update dropdowns
function updateDropdowns() {
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');

    if (!originSelect || !destinationSelect) return;

    originSelect.innerHTML = '<option value="">Select Origin</option>';
    destinationSelect.innerHTML = '<option value="">Select Destination</option>';

    destinations.forEach((destination) => {
        const option = document.createElement('option');
        option.value = destination.name;
        option.textContent = destination.name;

        originSelect.appendChild(option.cloneNode(true));
        destinationSelect.appendChild(option);
    });
}

// Event listener for form submission (Manage Destinations Page)
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const destination = {
            name: document.getElementById('destinationName').value,
            imageUrl: document.getElementById('imageUrl').value,
            airportName: document.getElementById('airportName').value,
            airportWebsite: document.getElementById('airportWebsite').value,
            email: document.getElementById('email').value,
            code: document.getElementById('destinationCode').value
        };

        destinations.push(destination);

        renderDestinations();
        updateDropdowns();

        form.reset();
        alert('Destination added successfully!');
    });
}

// Initial rendering
renderDestinations();
updateDropdowns();
