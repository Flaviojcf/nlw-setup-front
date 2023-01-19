import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useId, useState } from "react";
import { api } from "../services/api";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleCreateNewHabit(e: FormEvent) {
    e.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);
  }

  function handleTogglerWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);

      setWeekDays((state) => (state = weekDaysWithRemovedOne));
    } else {
      const weekDaysWithRemovedOne = [...weekDays, weekDay];

      setWeekDays((state) => (state = weekDaysWithRemovedOne));
    }
  }

  return (
    <form
      onSubmit={(e) => handleCreateNewHabit(e)}
      className="w-full flex flex-col mt-6"
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((day, index) => {
          return (
            <Checkbox.Root
              key={useId()}
              className="flex items-center gap-3 group"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleTogglerWeekDay(index)}
            >
              <div
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 
               group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
              >
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className=" text-white leading-tight">{day}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
