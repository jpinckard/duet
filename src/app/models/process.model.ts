// process.model.ts
import { Task } from './task.model';

export class Process {
  name: string;
  tasks: Task[];
  cycleTime: number; // Positive float up to 1 decimal place
  workDuration: number; // Positive number up to 2 decimal places

  constructor(name: string, cycleTime: number, workDuration: number, tasks:Task[]) {
    this.name = name;
    this.cycleTime = cycleTime;
    this.workDuration = workDuration;
    this.tasks = tasks;
  }
}