import React, { useContext, useState } from "react";
import { useDate } from "../context/DateContext";
import { useCalendar } from "../context/CalendarContext";
import { createTask } from "../utils/API";
export default function CreateEventModel() {
  const labelsClasses = [
    "bg-indigo-400",
    "bg-amber-400",
    "bg-gray-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-fuchsia-400",
    "bg-violet-400",
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);
  const { daySelected } = useDate();
  const { setShowEventModel, setSyncTask } = useCalendar();

  async function handleSubmit(e) {
    e.preventDefault();
    const calendarTask = {
      title,
      description,
      label: selectedLabel,
      date: daySelected.valueOf(),
      status: false,
    };
    await createTask(calendarTask);
    setShowEventModel(false);
    setSyncTask(true);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
      <form className="bg-gray-100 rounded-lg shadow-2xl w-1/4">
        <header className=" px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button onClick={() => setShowEventModel(false)}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pt-3 border-b-2  border-gray-200 focus:outline-none focus:border-blue-400 text-lg font-semibold w-full"
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pt-3 border-b-2 border-gray-200 focus:outline-none focus:border-blue-400 w-full"
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((label, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(label)}
                  className={`${label} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === label && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
