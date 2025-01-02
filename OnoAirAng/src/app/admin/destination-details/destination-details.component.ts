import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { destinations, Destination } from '../../models/destination';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css'],
})
export class DestinationDetailsComponent implements OnInit {
  destination: Destination | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.destination = destinations.find(d => d.code === code) || null;
    }
  }

  goBack(): void {
    this.router.navigate(['/destination-management']);
  }
}
