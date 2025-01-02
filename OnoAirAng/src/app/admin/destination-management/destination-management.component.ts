import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { Destination, destinations } from '../../models/destination';

@Component({
  selector: 'app-destination-management',
  standalone: true,
  imports: [MatTableModule, HeaderComponent], // Add HeaderComponent
  templateUrl: './destination-management.component.html',
  styleUrls: ['./destination-management.component.css'],
})
export class DestinationManagementComponent implements OnInit {
  destinations: Destination[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.destinations = destinations; // Fetch the destinations data
  }

  goToDestinationDetails(code: string): void {
    this.router.navigate(['/destination-details', code]);
  }
}
