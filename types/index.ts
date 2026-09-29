// Type definitions for StudentHub
// Used by all members - coordinate changes with Member 5

/**
 * Task model for task management
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
}

/**
 * Grade model for grade tracking
 */
export interface Grade {
  id: string;
  course: string;
  score: number;
  createdAt?: string;
}

/**
 * Note model for note-taking
 */
export interface Note {
  id: string;
  subject: string;
  title: string;
  content: string;
  createdAt?: string;
}

/**
 * Group member model for profile management
 */
export interface GroupMember {
  id: number;
  name: string;
  role: string;
}

/**
 * User profile model
 */
export interface UserProfile {
  name: string;
  role: string;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  pendingTasksCount: number;
  completedTasksCount: number;
  totalTasksCount: number;
  averageGrade: number;
  gradesCount: number;
  totalNotesCount: number;
}
