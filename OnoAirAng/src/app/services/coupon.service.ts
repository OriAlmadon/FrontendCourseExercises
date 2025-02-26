import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coupon, coupons } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private originalCoupons: Coupon[] = [...coupons];
  private couponsSubject = new BehaviorSubject<Coupon[]>([...this.originalCoupons]);
  coupons$ = this.couponsSubject.asObservable();

  getCoupons(): Coupon[] {
    return this.couponsSubject.getValue();
  }

  getValidCoupon(code: string): Coupon | null {
    const coupon = this.getCoupons().find(c => c.code === code);
    if (!coupon) return null;

    const now = new Date();
    if (now < coupon.startDate || now > coupon.endDate) return null;
    if (coupon.remainingUses <= 0) return null;

    return coupon;
  }

  applyDiscount(code: string, basePrice: number): number {
    const coupon = this.getValidCoupon(code);
    if (!coupon) return basePrice;

    this.decrementCouponUsage(code); // Reduce usage count

    return basePrice - (basePrice * (coupon.discountPercentage / 100));
  }

  decrementCouponUsage(code: string): void {
    const updatedCoupons = this.getCoupons().map(c => 
      c.code === code && c.remainingUses > 0 ? { ...c, remainingUses: c.remainingUses - 1 } : c
    );

    this.originalCoupons = updatedCoupons;
    this.couponsSubject.next([...updatedCoupons]); // Notify subscribers
  }

  addCoupon(newCoupon: Coupon): void {
    this.originalCoupons = [...this.originalCoupons, newCoupon];
    this.couponsSubject.next([...this.originalCoupons]); // Notify subscribers
  }

  deleteCoupon(code: string): void {
    this.originalCoupons = this.originalCoupons.filter(c => c.code !== code);
    this.couponsSubject.next([...this.originalCoupons]); // Notify subscribers
  }

  updateCoupon(updatedCoupon: Coupon): void {
    const updatedCoupons = this.originalCoupons.map(c =>
      c.code === updatedCoupon.code ? updatedCoupon : c
    );

    this.originalCoupons = updatedCoupons;
    this.couponsSubject.next([...updatedCoupons]); // Notify subscribers
  }
}
