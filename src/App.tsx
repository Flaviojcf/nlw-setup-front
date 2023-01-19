import "./styles/global.css";

import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";

export function App() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-full max-w-5xl  gap-16 tablet:h-screen tablet:gap-1 tablet:pt-24 tablet:pb-24">
        <Header />
        <SummaryTable/>
      </div>
    </div>
  );
}
