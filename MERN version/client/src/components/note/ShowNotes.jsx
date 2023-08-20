import { useNote } from "../../context/NoteContext";
export default function ShowNotes() {
  const { notes, showNoteModel, setCreateNote, setShowNoteModel, setShowNote } =
    useNote();
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h1 className="text-xl border-b">Your Quick Notes</h1>
        <div>
          {notes.map((note) => (
            <div
              onClick={() => {
                setShowNoteModel(true);
                setShowNote(note);
              }}
              className="cursor-pointer border-2 flex justify-center border-primary my-4 overflow-hidden"
            >
              {note.title}
            </div>
          ))}
        </div>
      </div>
      <footer>
        <button
          onClick={() => setCreateNote(true)}
          className="bg-teal-500 rounded-full text-white p-2"
        >
          Add A Note
        </button>
      </footer>
    </div>
  );
}
