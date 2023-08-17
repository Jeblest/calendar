import React from "react";

export default function TaskTracking() {
  return (
    <div>
      <div className="text-lg">Your Tasks</div>
      <div>
        <input type="radio" value={"Reminder"} name="task" id="task"/>
        <label htmlFor="task">Reminder</label>
      </div>

    </div>
  );
}
