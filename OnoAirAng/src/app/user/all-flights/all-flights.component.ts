import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-flights',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './all-flights.component.html',
  styleUrls: ['./all-flights.component.css'],
})
export class AllFlightsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'flightNumber',
    'departure',
    'arrival',
    'departureTime',
    'arrivalTime',
    'seats',
    'price',
    'actions',
  ];
  dataSource = new MatTableDataSource<Flight>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dateRangeForm: FormGroup;

  constructor(private flightService: FlightService, private router: Router) {
    // Initializing the form group with default values
    this.dateRangeForm = new FormGroup({
      exactDate: new FormControl(null),
      flexibleDateRange: new FormControl(null, [Validators.pattern('^[+-]?\\d+$')]),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.loadFlights();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFlights(): void {
    this.dataSource.data = this.flightService.getFlights();
    this.dataSource.filterPredicate = (data: Flight, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.flightNumber.toLowerCase().includes(lowerCaseFilter) ||
        data.departure.name.toLowerCase().includes(lowerCaseFilter) ||
        data.arrival.name.toLowerCase().includes(lowerCaseFilter)
      );
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  bookFlight(flightNumber: string): void {
    this.router.navigate(['/booking', flightNumber]);
  }

  onSearch(): void {
    const formValues = this.dateRangeForm.value;

    let filterFlights = this.flightService.getFlights();

    if (formValues.exactDate) {
      const exactDate = new Date(formValues.exactDate);
      filterFlights = filterFlights.filter(flight => {
        const departureDate = new Date(flight.departureDateTime);
        return departureDate.toDateString() === exactDate.toDateString();
      });
    } else if (formValues.flexibleDateRange) {
      const range = parseInt(formValues.flexibleDateRange, 10);
      const currentDate = new Date();
      const minDate = new Date(currentDate.setDate(currentDate.getDate() - range));
      const maxDate = new Date(currentDate.setDate(currentDate.getDate() + range));

      filterFlights = filterFlights.filter(flight => {
        const departureDate = new Date(flight.departureDateTime);
        return departureDate >= minDate && departureDate <= maxDate;
      });
    } else if (formValues.startDate && formValues.endDate) {
      const startDate = new Date(formValues.startDate);
      const endDate = new Date(formValues.endDate);

      if (startDate > endDate) {
        alert('End date cannot be before start date.');
        return;
      }

      filterFlights = filterFlights.filter(flight => {
        const departureDate = new Date(flight.departureDateTime);
        return departureDate >= startDate && departureDate <= endDate;
      });
    }

    if (filterFlights.length === 0) {
      alert('No flights found for the chosen dates.');
    } else {
      this.dataSource.data = filterFlights;
    }
  }
}
