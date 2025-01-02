import { Booking, bookings } from './booking';

describe('Booking', () => {
  it('should create an instance of Booking', () => {
    const booking = new Booking('BK001', 'FL001', 2, [
      { name: 'John Doe', passportNumber: 'A1234567' },
      { name: 'Jane Smith', passportNumber: 'B7654321' },
    ]);
    expect(booking).toBeTruthy();
  });

  it('should contain 10 bookings in mock data', () => {
    expect(bookings.length).toBe(10);
  });

  it('should contain a booking with code BK001', () => {
    const booking = bookings.find(b => b.bookingCode === 'BK001');
    expect(booking).toBeTruthy();
    expect(booking?.flightNumber).toBe('FL001');
  });

  it('should return undefined for an invalid booking code', () => {
    const booking = bookings.find(b => b.bookingCode === 'XXX');
    expect(booking).toBeUndefined();
  });
});
