import { useContext, useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useDate } from "../context/DateContext";
import { useCalendar } from "../context/CalendarContext";
import { updateItem } from "../utils/API";
export default function DayView() {
  const { daySelected } = useDate();
  const {
    savedEvents,
    setShowDailyEvent,
    setShowEventModel,
    setSyncTask,
    viewMode,
  } = useCalendar();

  function handleAddEvent() {
    setShowEventModel(true);
  }
  function toggleStatus(event) {
    const status = event.status;
    event.status = !status;
    updateItem("task", event.id, event);
    setSyncTask(true);
  }
  return (
    <div className="flex flex-col flex-1 mx-20 ">
      <div className="flex justify-between items items-end border-b-2 border-gray-300  w-full pl-4 pb-1">
        <div>
          <div className="text-sm">{daySelected.format("dddd")}</div>
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full text-2xl flex justify-center items-center">
            {daySelected.format("DD")}
          </div>
        </div>
        <button
          onClick={handleAddEvent}
          className="border-2 bg-gradient-to-b from-primary to-secondary w-12 h-12 text-white text-2xl  rounded-full flex items-center justify-center "
        >
          +
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {savedEvents.map((event) =>
          daySelected.format("DD-MM-YYYY") ===
          dayjs(event.date).format("DD-MM-YYYY") ? (
            <div className="border-b-2 border-gray-300 rounded-lg relative flex">
              <div
                className={`${
                  event.label
                } w-full h-10 text-white my-2 cursor-pointer flex items-center pl-10 rounded-full  ${
                  event.status ? "opacity-50" : "opacity-100"
                } `}
                onClick={() => setShowDailyEvent(event)}
              >
                <span className="w-56 overflow-hidden whitespace-nowrap text-ellipsis ">
                  {event.title}
                </span>
              </div>
              <button
                onClick={() => toggleStatus(event)}
                className={`absolute   mr-5 border-2 top-1/2 right-1 -translate-y-1/2 rounded-full flex justify-center h-8 w-8 items-center ${
                  event.status ? "bg-gray-400" : "bg-white"
                }`}
              ></button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
