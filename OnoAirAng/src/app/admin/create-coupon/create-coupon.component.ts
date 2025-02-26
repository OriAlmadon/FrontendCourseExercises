import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/coupon';
import { CouponsService } from '../../services/coupon.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-coupon',
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
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {
  coupon: Coupon = new Coupon('', 0, new Date(), new Date(), 0);

  constructor(private couponsService: CouponsService, private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.coupon.code && this.coupon.discountPercentage > 0 && this.coupon.remainingUses > 0) {
      this.couponsService.addCoupon(this.coupon);
      this.notificationService.showSuccess('Created Coupon successful!');
      this.router.navigate(['/admin/all-coupons']);
    } else {
      // Handle form validation error (optional)
      console.log('Form is not valid!');
    }
  }
}
