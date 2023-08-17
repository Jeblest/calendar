import React, { useContext } from "react";
import dayjs from "dayjs";
import Day from "./Day";
export default function WeekView({ week }) {
  return (
    <div className="flex-1 grid grid-cols-7 justify-evenly border-b border-gray-200 ">
      {week.map((day, i) => (
        <Day day={day} key={i} rowIdx={0} />
      ))}
    </div>
  );
}
