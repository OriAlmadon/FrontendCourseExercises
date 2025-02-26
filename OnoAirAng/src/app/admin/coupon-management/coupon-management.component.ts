import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';  // Import Router for navigation
import { Coupon } from '../../models/coupon';
import { CouponsService } from '../../services/coupon.service';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core'; 
import { NotificationService } from '../../services/notification.service';

// Custom date format (optional)
export const MY_DATE_FORMATS: MatDateFormats = {
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
  parse: {
    dateInput: 'YYYY-MM-DD', // How to parse the date input
  },
};

@Component({
  selector: 'app-coupon-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    DatePipe,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Optional custom date format
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },  // Optional locale setting
  ]
})
export class CouponManagementComponent implements OnInit {
  displayedColumns: string[] = ['code', 'discountPercentage', 'startDate', 'endDate', 'remainingUses', 'actions'];
  dataSource = new MatTableDataSource<Coupon>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private couponsService: CouponsService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCoupons() {
    this.dataSource.data = this.couponsService.getCoupons();
  }

  // Navigate to create coupon page
  openAddCoupon() {
    this.router.navigate(['/admin/create-coupon']);
  }

  // Navigate to update coupon page
  openEditCoupon(coupon: Coupon) {
    this.router.navigate([`/admin/update-coupon/${coupon.code}`]);  // Assuming 'code' is unique identifier
  }

  // Delete coupon
  deleteCoupon(code: string) {
    if (confirm('Are you sure you want to delete this coupon?')) {
      this.couponsService.deleteCoupon(code);
      this.loadCoupons();
      this.notificationService.showSuccess('Deleted Coupon successful!');
    }
  }
}
