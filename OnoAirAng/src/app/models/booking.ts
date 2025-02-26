import { Flight } from './flight'; // Ensure the path to 'flight.ts' is correct
import { Coupon } from './coupon'; // Ensure the path to 'coupon.ts' is correct

// Define the Booking interface
export interface Booking {
  id: number; // Unique ID for the booking
  flight: Flight; // Flight details associated with the booking
  passengers: { 
    name: string; // Passenger's name
    passportNumber: string; // Passenger's passport number
  }[]; // Array of passengers
  basePrice: number; // Total price before discounts
  coupon?: Coupon;
}
