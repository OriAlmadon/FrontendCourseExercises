import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-flights',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe],
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

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFlights(): void {
    this.dataSource.data = this.flightService.getAll();
  }

  bookFlight(flightNumber: string): void {
    this.router.navigate(['/booking', flightNumber]);
  }
}
