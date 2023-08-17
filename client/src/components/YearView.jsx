import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { getMonth } from "../utils/getDate";
import { useCalendar } from "../context/CalendarContext";
import { useDate } from "../context/DateContext";

export default function YearView() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const months = [...Array(12).keys()];
  const {setSmallCalendarMonth} = useCalendar()
  const {setDaySelected,daySelected,currentYear} = useDate()


  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getCurrentDayClass(day) {
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
      ? "bg-blue-500 text-white rounded-full"
      : "";
  }
  function otherMonthDays(day) {
    return;
  }

  return (
    <div className="mt-9 grid grid-cols-4 flex-1 gap-y-5 ml-16">
      {months.map((month, idx) => {
        const increment = currentMonthIdx + idx;
        return (
          <div className="w-52">
            <header className="">
              <p className="text-gray-500 font-semibold ml-2">
                {dayjs(new Date(currentYear, month)).format("MMMM")}
              </p>
            </header>
            <div>
              <div className="grid grid-cols-7 grid-rows-7">
                {getMonth(month)[0].map((day, i) => (
                  <span key={i} className="text-sm text-center py-1">
                    {day.format("dd").charAt(0)}
                  </span>
                ))}
                {getMonth(month, currentYear).map((row, i) => (
                  <React.Fragment key={i}>
                    {row.map((day, idx) => (
                      <button
                        key={idx}
                        className={`py-1 ${getCurrentDayClass(day)} ${
                          day.format("MMMM") !==
                          dayjs().month(increment).format("MMMM")
                            ? "text-gray-400"
                            : ""
                        } ${
                          daySelected.format("DD-MM-YYYY") ===
                            day.format("DD-MM-YYYY") &&
                          day.format("DD-MM-YYYY") !==
                            dayjs().format("DD-MM-YYYY") &&
                          "bg-blue-200 text-white rounded-full"
                        }
                 focus:bg-blue-200 focus:text-white focus:rounded-full transition ease-in-out duration-100`}
                        onClick={() => {
                          setSmallCalendarMonth(month);
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
          </div>
        );
      })}
    </div>
  );
}
