import React, { useContext, useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "../utils/getDate";
import { useDate } from "../context/DateContext";
import { useCalendar } from "../context/CalendarContext";
import { useEffect } from "react";
export default function SmallCalendar() {
  const { monthIndex, setDaySelected, daySelected } = useDate();
  const { setSmallCalendarMonth } = useCalendar();
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth(currentMonthIdx));
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getCurrentDayClass(day) {
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
      ? "bg-blue-500 text-white rounded-full"
      : "";
  }
  function otherMonthDays(day) {
    return day.format("MMMM") !== dayjs().month(currentMonthIdx).format("MMMM")
      ? "text-gray-400"
      : "";
  }
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-semibold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className="">
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 ">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600  mx-1">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-7">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm text-center py-1">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full ${getCurrentDayClass(
                  day
                )} ${otherMonthDays(day)} ${
                  daySelected.format("DD-MM-YYYY") ===
                    day.format("DD-MM-YYYY") &&
                  day.format("DD-MM-YYYY") !== dayjs().format("DD-MM-YYYY") &&
                  "bg-blue-200 text-white rounded-full"
                }
                 focus:bg-blue-200 focus:text-white focus:rounded-full transition ease-in-out duration-100`}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
              >
                <span className="text-xs">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
