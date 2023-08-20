import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [showNoteModel, setShowNoteModel] = useState(false);
  const [syncNote, setSyncNote] = useState(false);
  const [createNote,setCreateNote] = useState(false);
  const [showNote,setShowNote] = useState(null);
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        showNoteModel,
        setShowNoteModel,
        syncNote,
        setSyncNote,
        createNote,
        setCreateNote,
        showNote,
        setShowNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export function useNote() {
  return useContext(NoteContext);
}
