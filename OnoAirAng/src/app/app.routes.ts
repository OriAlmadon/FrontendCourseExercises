import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightManagementComponent } from './admin/flight-management/flight-management.component';
import { DestinationManagementComponent } from './admin/destination-management/destination-management.component';
import { MyBookingsComponent } from './user/my-bookings/my-bookings.component';
import { DestinationDetailsComponent } from './admin/destination-details/destination-details.component';
import { LastMinuteFlightsComponent } from './last-minute-flights/last-minute-flights.component'; // Import Last-Minute Flights Component
import { BookingComponent } from './user/booking/booking.component';
import { AllFlightsComponent } from './user/all-flights/all-flights.component'; // Import the new component
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import { FlightStatusComponent } from './admin/flight-status/flight-status.component';
import { CouponManagementComponent } from './admin/coupon-management/coupon-management.component';
import { CreateCouponComponent } from './admin/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './admin/update-coupon/update-coupon.component';
export const routes: Routes = [
  { path: 'booking/:flightNumber', component: BookingComponent },
  { path: 'user/bookings', component: MyBookingsComponent }, // Existing route
  { path: '', component: HomeComponent }, // Home page
  { path: 'admin/flights', component: FlightManagementComponent }, // Flight Management Page
  { path: 'admin/flights/flight-status/:flightNumber', component: FlightStatusComponent },
  { path: 'admin/all-coupons', component: CouponManagementComponent },
  { path: 'admin/create-coupon', component: CreateCouponComponent },
  { path: 'admin/update-coupon/:couponCode', component: UpdateCouponComponent },
  { path: 'destination-management', component: DestinationManagementComponent }, // Destination Management Page
  { path: 'destination-details/:code', component: DestinationDetailsComponent }, // Destination Details Page
  { path: 'user/bookings', component: MyBookingsComponent }, // My Bookings Page
  { path: 'last-minute-flights', component: LastMinuteFlightsComponent }, // Last-Minute Flights Page
  { path: 'booking/:flightNumber', component: BookingComponent },
  { path: 'booking-details/:flightNumber', component: BookingDetailsComponent },
  { path: '', component: LastMinuteFlightsComponent },
  { path: 'user/booking/:flightNumber', component: BookingComponent },
  { path: 'user/all-flights', component: AllFlightsComponent }, 
  { path: 'flight-details/:flightNumber', component: FlightDetailsComponent },
];
