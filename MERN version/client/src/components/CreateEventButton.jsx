import React, { useEffect, useState } from "react";
import plusImg from "../assets/plus.svg";
import { useCalendar } from "../context/CalendarContext";
import { useGoal } from "../context/GoalContext";
export default function CreateEventButton() {
  const [selectedOption, setSelectedOption] = useState("Create");
  const { setShowEventModel } = useCalendar();
  const { setCreateGoal } = useGoal();

  useEffect(() => {
    if (selectedOption === "Task") {
      setShowEventModel(true);
    } else if (selectedOption === "Goal") {
      setCreateGoal(true);
    }
    
  },[selectedOption])

  return (
    /*     <button
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-md hover:shadow-zinc-400 transition duration-300"
      onClick={() => setShowEventModel(true)}
    >
      
      <span className="pl-3 pr-12">Create</span>
    </button> */
    <div className="flex items-center">
      <label className="absolute ml-2 flex items-center" htmlFor="create">
        <img src={plusImg} alt="" className="w-7 h-7" />
      </label>
      
      <select
        defaultValue={"Create"}
        id="create"
        name="create"
        onChange={(e) => setSelectedOption(e.target.value)}
        className="border px-12 py-3 rounded-full flex items-center shadow-md hover:shadow-md  hover:shadow-zinc-400 transition duration-300"
      >
        <option  selected >Create</option>
        <option value={"Task"}>Task</option>
        <option value={"Goal"}> Goal</option>
      </select>
    </div>
  );
}
