// task.model.ts

export class Task {
    name: string;
    omniResReps: number[]; // An 11-element array of positive integers for OMNI-RES values
    percentContribution: number; // A positive value between 0 and 100 (or a decimal?) #FIXME
    notes: string;
    constructor(name: string, omniResReps: number[], percentContribution:number, notes:string) {
      this.name = name;
      this.omniResReps = omniResReps;
      this.percentContribution = percentContribution;
      this.notes = notes;
    }
  }