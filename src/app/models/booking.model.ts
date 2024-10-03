import { BookingDetail } from './booking-detail.model';

export interface Booking {
    id: number;
    bookingDate: Date;
    paymentStatus: 'Unpaid' | 'Paid' | 'Refunded';
    status: string;
    totalAmount: number;
    userId: number;

    bookingDetails: BookingDetail[];
  }
  