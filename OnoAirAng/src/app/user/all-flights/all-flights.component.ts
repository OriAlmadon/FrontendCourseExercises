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

@Component({
  selector: 'app-all-flights',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule, DatePipe],
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
}
