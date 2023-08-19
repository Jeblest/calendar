import React, { createContext, useContext, useState } from "react";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayjs from "dayjs";
const DateContext = createContext();

export function DateProvider({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(0);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [currentYear, setYear] = useState(dayjs().year());
  return (
    <DateContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        currentYear,
        setYear,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  return useContext(DateContext);
}
