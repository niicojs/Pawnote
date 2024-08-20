import type { Holiday } from "./holiday";
import type { Period } from "./period";
import type { WeekFrequency } from "./week-frequency";

export type InstanceParameters = Readonly<{
  nextBusinessDay: Date
  firstMonday: Date
  firstDate: Date
  lastDate: Date

  version: number[]
  endings: string[]
  periods: Period[]
  holidays: Holiday[]
  weekFrequencies: Map<number, WeekFrequency>
  blocksPerDay: number
}>;
