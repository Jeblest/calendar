import React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useDate } from "../../context/DateContext";
import { useCalendar } from "../../context/CalendarContext";
import { getWeek } from "../../utils/getDate";
import { useGoal } from "../../context/GoalContext";
import GoalInfo from "./GoalInfo";
export default function ShowGoals() {
  const { monthIndex, daySelected, currentYear, weekIndex } = useDate();
  const { viewMode } = useCalendar();
  const { setCreateGoal, goals, setShowGoal } = useGoal();
  function goalType() {
    let result;

    switch (viewMode) {
      case "Month":
        result = dayjs().month(monthIndex).format("MMMM");
        break;
      case "Week":
        result =
          getWeek(weekIndex)[0].format("DD MMM") +
          "-" +
          getWeek(weekIndex)[6].format("DD MMM");
        break;
      case "Day":
        result =
          getWeek(weekIndex)[0].format("DD MMM") +
          "-" +
          getWeek(weekIndex)[6].format("DD MMM");
        break;
      case "Year":
        result = dayjs().year(currentYear).format("YYYY");
        break;
    }
    return result;
  }
  return (
    <div className="h-full flex flex-col justify-between ">
      <div>
        <header>
          <div>
            <h1 className="text-xl border-b-2">
              Goals For: <span className="block text-lg">{goalType()}</span>
            </h1>
          </div>
        </header>
        <main>
          {goals.map(
            (goal) =>
              goal.date === goalType() && (
                <div
                  onClick={() => setShowGoal(goal)}
                  className="border-b-2 border-gray-300"
                >
                  <div
                    className={`${goal.label} w-full h-10 text-white cursor-pointer flex items-center pl-10 mt-4`}
                  >
                    <span>{goal.title}</span>
                  </div>
                </div>
              )
          )}
        </main>
      </div>

      <footer>
        <button
          onClick={() => setCreateGoal(true)}
          className="bg-teal-500 rounded-full text-white p-2"
        >
          Add A Goal
        </button>
      </footer>
      {}
    </div>
  );
}
