import React from "react";
import dayjs from "dayjs";
import { useDate } from "../../context/DateContext";
import { useCalendar } from "../../context/CalendarContext";
export default function ShowGoals() {
  const { monthIndex, daySelected, currentYear } = useDate();
  const { viewMode } = useCalendar();
  function goalType() {
    let result;

    switch (viewMode) {
      case "Month":
        result = dayjs().month(monthIndex).format("MMMM");
        break;
      case "Week":
        result = dayjs().month(monthIndex).format("MMMM");
        break;
      case "Day":
        result = daySelected.format("MMMM DD");
        break;
      case "Year":
        result = dayjs().year(currentYear).format("YYYY");
        break;
    }
    return result;
  }
  return (
    <div className="h-full flex flex-col justify-between ">
      <header>
        <div>
          <h1 className="text-xl">Goals For {goalType()}</h1>
        </div>
      </header>
      <footer>
        <button className="bg-teal-500 rounded-full text-white p-2">
          Add A Goal
        </button>
      </footer>
    </div>
  );
}
