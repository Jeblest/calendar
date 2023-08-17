import React, { useContext } from "react";
import Day from "./Day";
export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 ">
      {month.slice(0, month.length - 1).map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, j) => (
            <Day day={day} key={j} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
