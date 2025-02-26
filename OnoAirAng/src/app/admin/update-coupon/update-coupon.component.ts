import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from '../../models/coupon';
import { CouponsService } from '../../services/coupon.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-update-coupon',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {
  coupon: Coupon | null = null;
  couponCode: string = '';  // To store the coupon code from the route

  constructor(
    private couponsService: CouponsService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve couponCode from the route
    this.route.paramMap.subscribe(params => {
      this.couponCode = params.get('couponCode') ?? '';  // Get couponCode from route
      this.loadCoupon();
    });
  }

  // Load the coupon data from the CouponsService based on couponCode
  loadCoupon() {
    if (this.couponCode) {
      this.coupon = this.couponsService.getCoupons().find(c => c.code === this.couponCode) || null;
    }
  }

  onSubmit() {
    if (this.coupon) {
      this.couponsService.updateCoupon(this.coupon);
      this.notificationService.showSuccess('Updated Coupon successful!');
      this.router.navigate(['/admin/all-coupons']);
    } else {
      console.error('Coupon not found for updating!');
    }
  }
}
