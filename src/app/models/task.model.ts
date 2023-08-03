// task.model.ts

export class Task {
    name: string;
    omniResReps: number[]; // An 11-element array of positive integers for OMNI-RES values
  
    constructor(name: string, omniResReps: number[]) {
      this.name = name;
      this.omniResReps = omniResReps;
    }
  }