import { useContext, useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useDate } from "../context/DateContext";
import { useCalendar } from "../context/CalendarContext";
export default function DayView() {
  const { daySelected } = useDate();
 const { savedEvents, setShowDailyEvent, setShowEventModel } = useCalendar();

  function handleAddEvent() {
    setShowEventModel(true);
  }
  return (
    <div className="flex flex-col flex-1 mx-20">
      <div className="flex justify-between items-end border-b-2 border-gray-300  w-full pl-4 pb-1">
        <div>
          <div className="text-sm">{daySelected.format("dddd")}</div>
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full text-2xl flex justify-center items-center">
            {daySelected.format("DD")}
          </div>
        </div>
        <button
          onClick={handleAddEvent}
          className="border-2 border-gray-300 px-4 py-2 rounded-full flex items-center active:bg-gray-600 active:text-white"
        >
          Add Task
        </button>
      </div>
      <div>
        {savedEvents.map((event) =>
          daySelected.format("DD-MM-YYYY") ===
          dayjs(event.day).format("DD-MM-YYYY") ? (
            <div className="border-b-2 border-gray-300">
              <div
                className={`${event.label} w-full h-10 text-white text-sm my-2 cursor-pointer`}
                onClick={() => setShowDailyEvent(event)}
              >
                <span>{event.title}</span>
                <span className="block">{event.description}</span>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
