import { useId } from "react";
import { generateDatesFromYearBeginning } from "../utils/gerante-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDatesToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="flex w-full">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day) => {
          return (
            <div
              key={useId()}
              className="flex items-center justify-center text-zinc-400 font-bold text-xl h-10 w-10"
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((day) => {
          return <HabitDay key={useId()} />;
        })}
        {amountOfDatesToFill > 0 &&
          Array.from({ length: amountOfDatesToFill }).map((day) => {
            return (
              <div
                key={useId()}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
