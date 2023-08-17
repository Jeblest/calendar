import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import ShowEventModel from "./ShowEventModel";
import CreateEventModel from "./CreateEventModel";
import { useDate } from "../context/DateContext";
import { useCalendar } from "../context/CalendarContext";
export default function Day({ day, rowIdx }) {
  const {monthIndex,setDaySelected} = useDate()
  const {savedEvents,showDailyEvent,setShowDailyEvent,setShowEventModel,viewMode,setViewMode} = useCalendar()


  function getCurrentDayClass() {
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
      ? "bg-blue-500 text-white rounded-full w-8 mx-auto"
      : "";
  }
  function otherMonthDays() {
    return day.format("MMMM") !== dayjs().month(monthIndex).format("MMMM")
      ? "text-gray-400"
      : "";
  }

  return (
    <div className="border border-gray-200  overflow-hidden">
      <header className=" items-center">
        {rowIdx === 0 && (
          <p className={`mt-1 text-center ${viewMode === "Week" && "text-sm"}`}>
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <div
          className={`p-1 my-1 text-center cursor-pointer ${getCurrentDayClass()} ${otherMonthDays()}`}
          onClick={() => setViewMode("Day")}

        >
          {day.format("DD")}
          
        </div>
        {savedEvents.map((event) =>
            dayjs(event.date).format("DD-MM-YYYY") === day.format("DD-MM-YYYY") ? (
              <div
                key={event.id}
                onClick={() => setShowDailyEvent(event)}
                className={`${event.label} text-xs rounded-sm text-white mt-1 cursor-pointer`}
              >
                {event.title}
              </div>
            ) : null
          )}
      </header>
      <div
        className="h-full cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModel(true);
        }}
      ></div>
    </div>
  );
}
