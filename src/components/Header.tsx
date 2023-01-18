import { Plus } from "phosphor-react";
import logoImage from "/assets/logo.svg";

export function Header() {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto ">
      <img src={logoImage} />
      <button className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300">
        <Plus size={20} className="text-violet-500" />
        Novo hábito
      </button>
    </div>
  );
}
