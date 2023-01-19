import dayjs from "dayjs";
import { useEffect, useId, useState } from "react";
import { api } from "../services/api";
import { generateDatesFromYearBeginning } from "../utils/gerante-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDatesToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  });

  return (
    <div className="flex w-full  min-w-[310px] tablet:flex-col tablet:items-center tablet:justify-center tablet:pt-10 tablet:pb-20 tablet:p-2  ">
      <div className="grid grid-rows-7 grid-flow-row gap-3 tablet:flex mobile:gap-1">
        {weekDays.map((day) => {
          return (
            <div
              key={useId()}
              className="flex items-center justify-center text-zinc-400 font-bold text-xl h-10 w-10 "
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3 tablet:grid-flow-row tablet:grid-cols-7 mobile:gap-1">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, 'day');
          });

          return (
            <HabitDay
              key={useId()}
              date = {date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
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
