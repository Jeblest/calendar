import { useContext, useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useDate } from "../context/DateContext";
import { useCalendar } from "../context/CalendarContext";
import { updateTask } from "../utils/API";
export default function DayView() {
  const { daySelected } = useDate();
  const { savedEvents, setShowDailyEvent, setShowEventModel, setSyncTask } =
    useCalendar();

  function handleAddEvent() {
    setShowEventModel(true);
  }
  function toggleStatus(event) {
    const status = event.status;
    event.status = !status;
    updateTask(event._id, event);
    setSyncTask(true);
  }
  return (
    <div className="flex flex-col flex-1 mx-20">
      <div className="flex justify-between items items-end border-b-2 border-gray-300  w-full pl-4 pb-1">
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
      <div className="grid grid-cols-3 gap-4">
        {savedEvents.map((event) =>
          daySelected.format("DD-MM-YYYY") ===
          dayjs(event.day).format("DD-MM-YYYY") ? (
            <div className="border-b-2 border-gray-300 rounded-lg relative flex">
              <div
                className={`${event.label} w-full h-10 text-white my-2 cursor-pointer flex items-center pl-10 rounded-full `}
                onClick={() => setShowDailyEvent(event)}
              >
                <span>{event.title}</span>
              </div>
              <button
                onClick={() => toggleStatus(event)}
                className={`absolute mr-5 border-2 top-1/2 right-1 -translate-y-1/2 rounded-full flex justify-center h-8 w-8 items-center ${
                  event.status ? "bg-red-500" : ""
                }`}
              ></button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
