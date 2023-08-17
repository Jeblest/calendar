import React, { useContext } from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import TaskTracking from "./TaskTracking";
import ShowGoals from "./goal/ShowGoals";
import { useGoal } from "../context/GoalContext";
import { useCalendar } from "../context/CalendarContext";
export default function SideBar() {
  const { sideBar } = useCalendar();
  const { showGoals } = useGoal();
  const showSideBar = () => {
    return sideBar
      ? "sticky top-0 h-full border-r p-5 w-64 overflow-hidden transition-opacity duration-500 opacity-100 ease-in-out"
      : "";
  };
  return (
    <aside
      className={`sticky top-0 h-full border-r p-5 w-64 overflow-hidden transition-all duration-500 ${
        sideBar ? "" : "hidden"
      }`}
    >
      {showGoals ? (
        <ShowGoals />
      ) : (
        <div
          className={`h-auto max-h-0 transition-all duration-500 ${
            sideBar ? "opacity-100" : "opacity-0"
          }`}
        >
          <CreateEventButton />
          <SmallCalendar />
          <TaskTracking />
        </div>
      )}
    </aside>
  );
}
