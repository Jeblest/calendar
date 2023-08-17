import { useState, useContext, useEffect } from "react";

import { getMonth, getWeek } from "../utils/getDate";
import CalendarHeader from "../components/CalendarHeader";
import SideBar from "../components/SideBar";
import Month from "../components/MonthView";
import CreateEventModel from "../components/CreateEventModel";
import ShowEventModel from "../components/ShowEventModel";
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import YearView from "../components/YearView";
import axios from "axios";
import { useCalendar } from "../context/CalendarContext";
import { useDate } from "../context/DateContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getGoals, getTasks } from "../utils/API";
import { useGoal } from "../context/GoalContext";
import CreateGoal from "../components/goal/CreateGoal";
import GoalInfo from "../components/goal/GoalInfo";
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentWeek, setCurrentWeek] = useState(getWeek());
  const { setUser, user } = useUser();
  const { monthIndex, weekIndex, currentYear } = useDate();
  const {
    showDailyEvent,
    showEventModel,
    viewMode,
    setSavedEvents,
    syncTask,
    setSyncTask,
    savedEvents,
  } = useCalendar();
  const { createGoal, setGoals, setSyncGoal, syncGoal, showGoal } = useGoal();
  const nav = useNavigate();
  async function fetchTasks() {
    const tasks = await getTasks();
    setSavedEvents(tasks);
    setSyncTask(false);
  }
  useEffect(() => {
    fetchTasks();
  }, [syncTask]);
  async function fetchGoals() {
    const goals = await getGoals();
    setGoals(goals);
    setSyncGoal(false);
  }
  useEffect(() => {
    fetchGoals();
  }, [syncGoal]);
  const isAuth = async () => {
    try {
      const res = await axios({
        method: "Get",
        url: "http://localhost:3000/auth/user",
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
      nav("/login");
    }
  };
  useEffect(() => {
    isAuth();
  }, []);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  useEffect(() => {
    setCurrentWeek(getWeek(weekIndex));
  }, [weekIndex]);
  return (
    <>
      {showGoal && <GoalInfo goal={showGoal} />}
      {createGoal && <CreateGoal />}
      {showEventModel && <CreateEventModel />}
      {showDailyEvent && <ShowEventModel />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex h-full">
          <SideBar />
          {viewMode === "Year" && (
            <YearView month={currentMonth} year={currentYear} />
          )}
          {viewMode === "Month" && <Month month={currentMonth} />}
          {viewMode === "Day" && <DayView />}
          {viewMode === "Week" && (
            <WeekView week={currentWeek} month={currentMonth} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
