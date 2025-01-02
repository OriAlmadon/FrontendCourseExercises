import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent implements OnInit {
  flight: Flight | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.flight = this.flightService.getByFlightNumber(flightNumber);
    }

    if (!this.flight) {
      alert('Flight not found!');
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/user/all-flights']);
  }
}
