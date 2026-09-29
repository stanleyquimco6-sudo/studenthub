import { useState } from "react";
import type { Note } from "../types";
import { mockNotes } from "../constants/mockData";

/**
 * Custom hook for note management
 * Handles all note state and operations
 * Created by: Member 4
 */
export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);

  const addNote = (subject: string, title: string, content: string) => {
    if (subject.trim() && title.trim() && content.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        subject,
        title,
        content,
      };
      setNotes([...notes, newNote]);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const getNotesBySubject = (subject: string): Note[] => {
    return notes.filter((n) => n.subject === subject);
  };

  const getSubjects = (): string[] => {
    const subjects = new Set(notes.map((n) => n.subject));
    return Array.from(subjects);
  };

  return {
    notes,
    addNote,
    deleteNote,
    getNotesBySubject,
    getSubjects,
  };
};
