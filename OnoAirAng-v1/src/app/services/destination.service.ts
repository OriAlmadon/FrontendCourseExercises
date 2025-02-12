import { Injectable } from '@angular/core';
import { Destination, destinations } from '../models/destination';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinationList = destinations;

  getAll(): Destination[] {
    return this.destinationList;
  }

  getByCode(code: string): Destination | undefined {
    return this.destinationList.find(dest => dest.code === code);
  }
}
