import { useState } from "react";
import { updateItem, deleteItem } from "../../utils/API";
import { useNote } from "../../context/NoteContext";
export default function NoteInfo({ note }) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const { setShowNoteModel, setSyncNote } = useNote();
  async function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      title,
      body,
    };
    await updateItem("note", note.id, newNote);
    setSyncNote(true);
    setShowNoteModel(false)
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50 text-gray-800">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined ">
            drag_handle
          </span>
          <div>
            <button
                className="mr-4"
              type="button"
              onClick={() => {
                deleteItem("note", note.id);
                setShowNoteModel(null);
                setSyncNote(true);
              }}
            >
              <span className="material-icons-outlined ">
                delete
              </span>
            </button>
            <button onClick={() => setShowNoteModel(false)}>
              <span className="material-icons-outlined ">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="px-10">
          <div className="flex flex-col gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pt-3 border-b-2 border-gray-200 focus:outline-none focus:border-blue-400 text-lg font-semibold w-full"
            />

            <div></div>
            <textarea
              value={body}
              className="border-2 p-2"
              onChange={(e) => setBody(e.target.value)}
              name="body"
              id="body"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <footer className="flex justify-center border-t p-3 mt-5">
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
