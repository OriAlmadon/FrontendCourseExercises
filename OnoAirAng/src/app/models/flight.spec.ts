import { Flight, flights } from './flight';

describe('Flight', () => {
  it('should create an instance of Flight', () => {
    const flight = new Flight('FL001', 'JFK', 'LAX', new Date(), new Date(), 180);
    expect(flight).toBeTruthy();
  });

  it('should contain 10 flights in mock data', () => {
    expect(flights.length).toBe(10);
  });

  it('should contain a flight with number FL001', () => {
    const flight = flights.find(f => f.flightNumber === 'FL001');
    expect(flight).toBeTruthy();
    expect(flight?.departureCode).toBe('JFK');
  });

  it('should return undefined for an invalid flight number', () => {
    const flight = flights.find(f => f.flightNumber === 'XXX');
    expect(flight).toBeUndefined();
  });
});
