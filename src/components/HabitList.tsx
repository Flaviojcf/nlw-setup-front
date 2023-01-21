import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useId, useState } from "react";
import { api } from "../services/api";

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitsInfoProps {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfoProps>();

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  async function handleToggleHabot(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });
    onCompletedChange(completedHabits.length)
  }

  return (
    <div className="flex flex-col mt-6 gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            onCheckedChange={() => handleToggleHabot(habit.id)}
            disabled={isDateInPast}
            defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
          >
            <div
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 
                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors 
                group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2
                group-focus:ring-offset-background"
            >
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span
              className="font-semibold text-xl text-white leading-tight 
                group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
            >
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
