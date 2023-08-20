import React, { useContext } from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import ShowGoals from "./goal/ShowGoals";
import { useGoal } from "../context/GoalContext";
import { useCalendar } from "../context/CalendarContext";
import ShowNotes from "./note/ShowNotes";
export default function SideBar() {
  const { sideBar, sideBarMode } = useCalendar();
  const { showGoals } = useGoal();
  const showSideBar = () => {
    return sideBar
      ? "sticky top-0 h-full border-r p-5 w-64 overflow-hidden transition-opacity duration-500 opacity-100 ease-in-out"
      : "";
  };
  return (
    <aside
      className={`sticky top-0 h-full border-r p-5 w-64 overflow-hidden transition-all duration-500 overflow-y-scroll ${
        sideBar ? "" : "hidden"
      }`}
    >
      {sideBarMode === "SmallCalendar" && (
        <div
          className={`h-auto max-h-0 transition-all duration-500 ${
            sideBar ? "opacity-100" : "opacity-0"
          }`}
        >
          <CreateEventButton />
          <SmallCalendar />
        </div>
      )}
      {sideBarMode === "Goals" && <ShowGoals />}
      {sideBarMode === "Notes" && <ShowNotes/>}
    </aside>
  );
}
