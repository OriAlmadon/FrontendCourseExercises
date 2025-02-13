import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';

@Component({
  selector: 'app-flight-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.css'],
  providers: [FlightService],
})
export class FlightManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'flightNumber',
    'departure',
    'arrival',
    'departureTime',
    'arrivalTime',
    'seats',
    'actions',
  ];
  dataSource = new MatTableDataSource<Flight>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  ngAfterViewInit(): void {
    // Ensure paginator and sort are set after view is initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Ensure sort works even after filter is applied
    this.dataSource.filterPredicate = (data: Flight, filter: string) => {
      return data.flightNumber.toLowerCase().includes(filter) || 
             data.departure.name.toLowerCase().includes(filter) || 
             data.arrival.name.toLowerCase().includes(filter);
    };
  }

  loadFlights(): void {
    const flights = this.flightService.getAll();
    this.dataSource.data = flights;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    // Reset pagination after filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToFlightDetails(flightNumber: string): void {
    this.router.navigate(['/flight-details', flightNumber]);
  }
}
