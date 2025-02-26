export class Coupon {
    constructor(
        public code: string, // Unique coupon code
        public discountPercentage: number, // Discount percentage
        public startDate: Date, // Coupon start date
        public endDate: Date, // Coupon expiry date
        public remainingUses: number // Remaining available uses
    ) { }
}

export const coupons: Coupon[] = [
    new Coupon('SAVE10', 10, new Date(2025, 0, 1), new Date(2025, 11, 31), 100),
    new Coupon('FLY20', 20, new Date(2025, 5, 1), new Date(2025, 8, 31), 50),
    new Coupon('NEWYEAR30', 30, new Date(2025, 0, 1), new Date(2025, 0, 10), 20),
    new Coupon('SUMMER25', 25, new Date(2025, 5, 1), new Date(2025, 7, 31), 75),
    new Coupon('SPRING15', 15, new Date(2025, 2, 15), new Date(2025, 4, 15), 40),
    new Coupon('WINTER50', 50, new Date(2025, 11, 1), new Date(2025, 11, 31), 10),
    new Coupon('WELCOME5', 5, new Date(2025, 0, 1), new Date(2025, 11, 31), 200),
    new Coupon('VIP40', 40, new Date(2025, 1, 1), new Date(2025, 11, 31), 5),
    new Coupon('FLASHSALE60', 60, new Date(2025, 6, 1), new Date(2025, 6, 3), 15),
    new Coupon('LOYALTY35', 35, new Date(2025, 3, 1), new Date(2025, 3, 30), 30),
    new Coupon('STUDENT20', 20, new Date(2025, 0, 1), new Date(2025, 11, 31), 100),
    new Coupon('BLACKFRIDAY75', 75, new Date(2025, 10, 29), new Date(2025, 11, 1), 10),
    new Coupon('CYBERMONDAY50', 50, new Date(2025, 11, 2), new Date(2025, 11, 3), 20),
    new Coupon('HALLOWEEN25', 25, new Date(2025, 9, 25), new Date(2025, 10, 2), 30),
    new Coupon('BIRTHDAY50', 50, new Date(2025, 0, 1), new Date(2025, 11, 31), 1),
    new Coupon('EARLYBIRD15', 15, new Date(2025, 2, 1), new Date(2025, 5, 1), 80),
    new Coupon('WEEKENDDEAL30', 30, new Date(2025, 0, 1), new Date(2025, 11, 31), 45),
    new Coupon('FLASH20', 20, new Date(2025, 7, 1), new Date(2025, 7, 5), 25),
    new Coupon('GROUPDISCOUNT10', 10, new Date(2025, 0, 1), new Date(2025, 11, 31), 300),
    new Coupon('REFERFRIEND25', 25, new Date(2025, 1, 15), new Date(2025, 11, 15), 150),
];
