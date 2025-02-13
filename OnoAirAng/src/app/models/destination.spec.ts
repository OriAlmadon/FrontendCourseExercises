export class Destination {
  constructor(
    public code: string, // Unique destination code (e.g., "JFK")
    public name: string, // Destination name (e.g., "New York City")
    public airportName: string, // Airport name (e.g., "John F. Kennedy International")
    public imageUrl: string, // Image URL for the destination
    public website: string, // Website link for the airport
    public email: string, // Contact email for the destination
    public country: string // Country of the destination (e.g., "United States")
  ) {}
}

export const destinations: Destination[] = [
  new Destination(
    'JFK',
    'New York City',
    'John F. Kennedy International',
    'https://example.com/jfk.jpg',
    'https://www.jfkairport.com',
    'info@jfkairport.com',
    'United States'
  ),
  new Destination(
    'LAX',
    'Los Angeles',
    'Los Angeles International',
    'https://example.com/lax.jpg',
    'https://www.flylax.com',
    'info@flylax.com',
    'United States'
  ),
  new Destination(
    'ORD',
    'Chicago',
    "O'Hare International",
    'https://example.com/ord.jpg',
    'https://www.flychicago.com/ohare',
    'info@flychicago.com',
    'United States'
  ),
  new Destination(
    'ATL',
    'Atlanta',
    'Hartsfield-Jackson Atlanta International',
    'https://example.com/atl.jpg',
    'https://www.atl.com',
    'info@atl.com',
    'United States'
  ),
  new Destination(
    'DFW',
    'Dallas/Fort Worth',
    'Dallas/Fort Worth International',
    'https://example.com/dfw.jpg',
    'https://www.dfwairport.com',
    'info@dfwairport.com',
    'United States'
  ),
  new Destination(
    'MIA',
    'Miami',
    'Miami International',
    'https://example.com/mia.jpg',
    'https://www.miami-airport.com',
    'info@miami-airport.com',
    'United States'
  ),
  new Destination(
    'SEA',
    'Seattle',
    'Seattle-Tacoma International',
    'https://example.com/sea.jpg',
    'https://www.portseattle.org',
    'info@portseattle.org',
    'United States'
  ),
  new Destination(
    'SFO',
    'San Francisco',
    'San Francisco International',
    'https://example.com/sfo.jpg',
    'https://www.flysfo.com',
    'info@flysfo.com',
    'United States'
  ),
  new Destination(
    'BOS',
    'Boston',
    'Logan International',
    'https://example.com/bos.jpg',
    'https://www.massport.com/logan-airport',
    'info@massport.com',
    'United States'
  ),
  new Destination(
    'PHX',
    'Phoenix',
    'Phoenix Sky Harbor International',
    'https://example.com/phx.jpg',
    'https://www.skyharbor.com',
    'info@skyharbor.com',
    'United States'
  ),
];
