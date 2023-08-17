import React, { useEffect } from "react";
import { useState } from "react";
import { deleteGoal, updateGoal } from "../../utils/API";

const labelsClasses = [
  "bg-indigo-400",
  "bg-amber-400",
  "bg-gray-400",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-fuchsia-400",
  "bg-violet-400",
];
export default function GoalInfo({ goal, setEditContent, editContent }) {
  const [selectedLabel, setSelectedLabel] = useState(goal.label);
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [date, setDate] = useState(goal.date);
  const handleEdit = async () => {

    await updateGoal(goal._id, {
      title,
      description,
      label: selectedLabel,
    });
    setEditContent(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => {
                deleteGoal(goal._id);
                setEditContent(false);
              }}
            >
              <span className="material-icons-outlined text-gray-400">
                delete
              </span>
            </button>
            <button onClick={() => setEditContent(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3 ">
          <div className="">
            <div></div>
            {editContent ? (
              <>
                <div>
                  <label htmlFor="title">Edit title:</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Add title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="pt-3 border-b-2 border-gray-200 focus:outline-none focus:border-blue-400 text-lg w-fit ml-2"
                  />
                </div>
                <div className="">
                  <label htmlFor="description">Edit Description:</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Add a description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="pt-3 border-b-2 border-gray-200 focus:outline-none focus:border-blue-400 ml-2 mb-5"
                  />
                </div>
                <div></div>
                <div className="flex gap-2 mb-4">
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

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </>
            ) : (
              <>
                <div className="text-lg">
                  <span
                    className={`inline-block w-4 h-4 rounded-md ${selectedLabel} mr-5 ml-5 `}
                  ></span>{" "}
                  {title}
                </div>
                <div className="text-sm text-gray-400 ml-16">{date}</div>

                <div className="text-md mt-5 flex">
                  <span className="material-icons-outlined text-gray-400 ml-5 mr-5 ">
                    description
                  </span>
                  {description}
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}