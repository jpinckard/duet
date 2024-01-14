import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  readonly maxCycleTime = 10000; // Adjust the value as needed
  readonly maxWorkDuration = 24; // Adjust the value as needed

  constructor() {}

  clampValue(value: number, min: number, max: number): number {
    console.log("Clamping value");
    return Math.min(Math.max(value, min), max);
  }
}