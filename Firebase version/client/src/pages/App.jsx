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
import { useNavigate, useRoutes } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getItems } from "../utils/API";
import { useGoal } from "../context/GoalContext";
import CreateGoal from "../components/goal/CreateGoal";
import GoalInfo from "../components/goal/GoalInfo";
import CreateNote from "../components/note/CreateNote";
import { useNote } from "../context/NoteContext";
import NoteInfo from "../components/note/NoteInfo";
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
  const {
    createNote,
    setNotes,
    syncNote,
    setSyncNote,
    showNoteModel,
    showNote,
  } = useNote();
  const nav = useNavigate();
  useEffect(() => {
    if(!user) return nav("/calendar/login")
  }, [user]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  useEffect(() => {
    setCurrentWeek(getWeek(weekIndex));
  }, [weekIndex]);

  async function fetchTasks() {
    if (!user) return;
    const tasks = await getItems("task", user.uid);
    setSavedEvents(tasks);
    setSyncTask(false);
  }
  useEffect(() => {
    fetchTasks();
  }, [syncTask, user]);
  async function fetchNote() {
    if (!user) return;
    const notes = await getItems("note", user.uid);
    setNotes(notes);
    setSyncNote(false);
  }
  useEffect(() => {
    fetchNote();
  }, [syncNote, user]);

  async function fetchGoals() {
    if (!user) return;
    const goals = await getItems("goal", user.uid);
    setGoals(goals);
    setSyncGoal(false);
  }
  useEffect(() => {
    fetchGoals();
  }, [syncGoal, user]);
  return (
    <>
      {showNoteModel && <NoteInfo note={showNote} />}
      {createNote && <CreateNote />}
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
