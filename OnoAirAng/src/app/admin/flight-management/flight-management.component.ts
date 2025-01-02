import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { HeaderComponent } from '../../shared/header/header.component';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';

@Component({
  selector: 'app-flight-management',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, HeaderComponent, DatePipe], // Add DatePipe here
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.css'],
  providers: [FlightService],
})
export class FlightManagementComponent implements OnInit {
  flights: Flight[] = [];
  displayedColumns: string[] = [
    'flightNumber',
    'departure',
    'arrival',
    'departureTime',
    'arrivalTime',
    'seats',
    'actions',
  ];

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.flights = this.flightService.getAll();
  }

  goToFlightDetails(flightNumber: string): void {
    this.router.navigate(['/flight-details', flightNumber]);
  }
}
