import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Destination } from '../../models/destination';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-destination-management',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './destination-management.component.html',
  styleUrls: ['./destination-management.component.css'],
})
export class DestinationManagementComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'airportName', 'actions'];
  dataSource = new MatTableDataSource<Destination>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private destinationService: DestinationService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.destinationService.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToDestinationDetails(code: string): void {
    this.router.navigate(['/destination-details', code]);
  }
}
