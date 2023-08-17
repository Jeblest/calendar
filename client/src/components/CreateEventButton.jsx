import React from "react";
import plusImg from "../assets/plus.svg";
import { useCalendar } from "../context/CalendarContext";
export default function CreateEventButton() {
  const { setShowEventModel } = useCalendar()
  return (
    <button
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-md hover:shadow-zinc-400 transition duration-300"
      onClick={() => setShowEventModel(true)}
    >
      <img src={plusImg} alt="" className="w-7 h-7" />
      <span className="pl-3 pr-12">Create</span>
    </button>
  );
}
