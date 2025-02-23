import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Destination, destinations } from '../models/destination';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private originalDestinations = destinations; // Store original destination data
  private destinationListSubject = new BehaviorSubject<Destination[]>([...this.originalDestinations]);
  destinationList$ = this.destinationListSubject.asObservable();

  // Get all destinations
  getAll(): Destination[] {
    return this.destinationListSubject.getValue();
  }

  // Get a destination by its code
  getByCode(code: string): Destination | undefined {
    return this.getAll().find(dest => dest.code === code);
  }

  // Update a destination dynamically
  updateDestination(updatedDestination: Destination): void {
    const updatedList = this.getAll().map(dest =>
      dest.code === updatedDestination.code ? updatedDestination : dest
    );
    this.destinationListSubject.next(updatedList); // Emit updated list
  }

  // Reset to original destinations (useful if needed)
  resetDestinations(): void {
    this.destinationListSubject.next([...this.originalDestinations]); // Reset data
  }
}
