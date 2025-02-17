import { Component } from '@angular/core';
import { Flight } from '../../models/flight';
import { FlightService } from '../../services/flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-flight-status',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
  ],
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.css']
})
export class FlightStatusComponent {
  selectedFlight?: Flight;
  selectedStatus?: "On Time" | "Delayed" | "Cancelled";
  newDepartureDate?: Date;
  newDepartureTime?: string;
  newArrivalDate?: Date;
  newArrivalTime?: string;
  isInvalidDateTime: boolean = false;

  statusOptions: ("On Time" | "Delayed" | "Cancelled")[] = ["On Time", "Delayed", "Cancelled"];

  constructor(private flightService: FlightService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.selectedFlight = this.flightService.getByFlightNumber(flightNumber);
      if (this.selectedFlight) {
        this.selectedStatus = this.selectedFlight.status;
      }
    }
  }

  onStatusChange(status: "On Time" | "Delayed" | "Cancelled"): void {
    if (this.selectedFlight) {
      this.selectedStatus = status;
      if (status === "Delayed") {
        this.newDepartureDate = new Date(this.selectedFlight.departureDateTime);
        this.newArrivalDate = new Date(this.selectedFlight.arrivalDateTime);
      } else {
        this.newDepartureDate = undefined;
        this.newDepartureTime = undefined;
        this.newArrivalDate = undefined;
        this.newArrivalTime = undefined;
      }
    }
  }

  validateTimes(): void {
    if (this.newDepartureDate && this.newDepartureTime && this.newArrivalDate && this.newArrivalTime) {
      const departureDateTime = this.combineDateAndTime(this.newDepartureDate, this.newDepartureTime);
      const arrivalDateTime = this.combineDateAndTime(this.newArrivalDate, this.newArrivalTime);
      this.isInvalidDateTime = arrivalDateTime <= departureDateTime;
    } else {
      this.isInvalidDateTime = false;
    }
  }
  
  statusClass(status: string): string {
    return {
      'On Time': 'status-on-time',
      'Delayed': 'status-delayed',
      'Cancelled': 'status-cancelled'
    }[status] || '';
  } 

  isFormValid(): boolean {
    if (!this.selectedStatus) return false;
    if (this.selectedStatus === "Delayed") {
      return !!(this.newDepartureDate && this.newDepartureTime && this.newArrivalDate && this.newArrivalTime && !this.isInvalidDateTime);
    }
    return true;
  }

  updateStatus(): void {
    if (this.selectedFlight) {
      this.selectedFlight.status = this.selectedStatus || "On Time";

      if (this.selectedStatus === "Delayed" && this.newDepartureDate && this.newDepartureTime) {
        this.selectedFlight.departureDateTime = this.combineDateAndTime(this.newDepartureDate, this.newDepartureTime);
      }
      if (this.selectedStatus === "Delayed" && this.newArrivalDate && this.newArrivalTime) {
        this.selectedFlight.arrivalDateTime = this.combineDateAndTime(this.newArrivalDate, this.newArrivalTime);
      }

      this.flightService.updateFlightStatus(
        this.selectedFlight.flightNumber,
        this.selectedFlight.status,
        this.selectedFlight.departureDateTime,
        this.selectedFlight.arrivalDateTime
      );
    }
  }

  private combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(":").map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0);
    return combinedDate;
  }

  goBack(): void {
    this.router.navigate(['/admin/flights']);
  }
}
