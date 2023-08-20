import React, { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [showEventModel, setShowEventModel] = useState(false);
  const [savedEvents, setSavedEvents] = useState([]);
  const [showDailyEvent, setShowDailyEvent] = useState(null);
  const [viewMode, setViewMode] = useState("Day");
  const [sideBar, setSideBar] = useState(true);
  const [syncTask, setSyncTask] = useState(false);
  const [sideBarMode, setSideBarMode] = useState("SmallCalendar");
  return (
    <CalendarContext.Provider
      value={{
        showDailyEvent,
        setShowDailyEvent,
        showEventModel,
        setShowEventModel,
        savedEvents,
        setSavedEvents,
        viewMode,
        setViewMode,
        sideBar,
        setSideBar,
        syncTask,
        setSyncTask,
        sideBarMode,
        setSideBarMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  return useContext(CalendarContext);
}
