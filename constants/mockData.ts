// Mock data for StudentHub
// Used for initial state and examples
// Replace with real data when backend is added

import type { Task, Grade, Note, GroupMember } from "../types";

export const mockTasks: Task[] = [
  { id: "1", title: "Read Chapter 3 of Textbook", completed: false },
  { id: "2", title: "Complete Math Assignment", completed: true },
  { id: "3", title: "Submit Project Report", completed: false },
  { id: "4", title: "Prepare for Quiz", completed: false },
  { id: "5", title: "Group Meeting - Monday 3PM", completed: false },
];

export const mockGrades: Grade[] = [
  { id: "1", course: "Mathematics", score: 88 },
  { id: "2", course: "English Literature", score: 92 },
  { id: "3", course: "Physics", score: 78 },
];

export const mockNotes: Note[] = [
  {
    id: "1",
    subject: "Mathematics",
    title: "Calculus Chapter 2",
    content: "Key concepts about derivatives and limits",
  },
  {
    id: "2",
    subject: "English",
    title: "Shakespeare Notes",
    content: "Important themes in Hamlet",
  },
  {
    id: "3",
    subject: "Physics",
    title: "Quantum Mechanics",
    content: "Introduction to quantum theory",
  },
];

export const mockGroupMembers: GroupMember[] = [
  { id: 1, name: "Alice Johnson", role: "Frontend Lead" },
  { id: 2, name: "Bob Smith", role: "Backend Developer" },
  { id: 3, name: "Carol Williams", role: "UI/UX Designer" },
  { id: 4, name: "David Brown", role: "Documentation" },
  { id: 5, name: "Eve Davis", role: "QA & Testing" },
];

export const APP_NAME = "StudentHub";
export const APP_VERSION = "1.0.0";
export const TEAM_SIZE = 5;
