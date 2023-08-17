import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import SideBar from "./SideBar";
import { useGoal } from "../context/GoalContext";
import { useDate } from "../context/DateContext";
import { useCalendar } from "../context/CalendarContext";
import axios from "axios";
dayjs.extend(weekOfYear);
export default function CalendarHeader() {
  const {monthIndex,setMonthIndex,weekIndex,setWeekIndex,smallCalendarMonth,setSmallCalendarMonth,daySelected,setDaySelected,currentYear,setYear,} = useDate();
  const {viewMode,setViewMode,sideBar,setSideBar} = useCalendar();
  const {showGoals,setShowGoals} = useGoal();

  const [selectedOption, setSelectedOption] = React.useState("Month");
  useEffect(() => {
    setViewMode(selectedOption);
  }, [selectedOption]);
  useEffect(() => {
    setSelectedOption(viewMode);
  }, [viewMode]);
  function handleToday() {
    setMonthIndex(dayjs().month());
    setWeekIndex(dayjs().week());
    setDaySelected(dayjs());
    setYear(dayjs().year());
  }
  function info(direction) {
    switch (viewMode) {
      case "Month":
        return `hover:before:content-['${direction}_Month']`;
      case "Week":
        return `hover:before:content-['${direction}_Week']`;
      case "Day":
        return `hover:before:content-['${direction}_Day']`;
    }
  }
  const day = daySelected.format("DD");
  async function logout(){
    try{
      const res = await axios({
        method:"GET",
        url:"http://localhost:3000/auth/logout",
        withCredentials:true
      })
      console.log(res);
      window.location.reload();
    }catch(error){
      console.log(error)
    }
    
  }
  return (
    <header className="flex items-center justify-between border-b border-gray-200">
      <div className="px-4 py-2 flex items-center">
        <button onClick={() => setSideBar(!sideBar)}>
          <span className="material-icons-outlined cursor-pointer mr-6 ml-4 active:bg-gray-200 active:rounded-full p-2">
            menu
          </span>
        </button>

        <img src={logo} alt="" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
        <button onClick={handleToday} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <button
          className={`${info("Prev")}
          before:absolute before:bg-gray-400 before:text-white before:rounded before:px-2 before:-translate-x-10 before:opacity-0   hover:before:opacity-100 `}
          onClick={() => {
            viewMode === "Month" && setMonthIndex(monthIndex - 1);
            viewMode === "Week" && setWeekIndex(weekIndex - 1);
            viewMode === "Day" && setDaySelected(dayjs().date(Number(day) - 1));
            viewMode === "Year" && setYear(currentYear - 1);
          }}
        >
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button
          className={`${info(
            "Prev"
          )} before:absolute before:bg-gray-400 before:text-white before:rounded before:px-2  before:translate-y-6 before:opacity-0 hover:before:opacity-100`}
          onClick={() => {
            viewMode === "Month" && setMonthIndex(monthIndex + 1);
            viewMode === "Week" && setWeekIndex(weekIndex + 1);
            viewMode === "Day" && setDaySelected(dayjs().date(Number(day) + 1));
            viewMode === "Year" && setYear(currentYear + 1);
          }}
        >
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>
        <span className="text-xl ml-4 text-gray-500">
          {viewMode === "Day" ? daySelected.format("MMMM DD, YYYY") : ""}
          {viewMode === "Month" || viewMode === "Week"
            ? dayjs().month(monthIndex).format("MMMM YYYY")
            : ""}
          {viewMode === "Year" ? currentYear : ""}
        </span>
      </div>

      <div className="mr-5">
        <button
          onClick={() => {
            setShowGoals(!showGoals);
            setSideBar(true);
          }}
          className="border box-border rounded py-2 px-4 mr-5"
        >
          {showGoals ? "Show Sidebar" : "Show Goals"}
        </button>

        <select
          name="viewMode"
          id="viewMode"
          className="border rounded box-border py-2 px-4 mr-5"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option defaultValue={"Month"}>Month</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Year">Year</option>
        </select>
        <button
          onClick={logout}
          className="border box-border rounded py-2 px-4 mr-5"
        >
          Logout
        </button>

      </div>
    </header>
  );
}
