import { Injectable } from '@angular/core';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private damagePerCycle: number[] = [
    0.00000026,
    0.00000045,
    0.00000137,
    0.00000413,
    0.00001262,
    0.00003801,
    0.00011625,
    0.00035014,
    0.00105374,
    0.00322581,
    0.00970864
  ];

  private cumulativeDamage:number = 0;

  constructor() { }

  getCumulativeDamage(task: Task): number {

    this.cumulativeDamage = 0;

    for (let i = 0; i < task.omniResReps.length; i++) {
      this.cumulativeDamage += task.omniResReps[i] * this.damagePerCycle[i];
    }
    
    return this.cumulativeDamage;
  }
}
