import { useState } from "react";
import type { Grade } from "../types";
import { mockGrades } from "../constants/mockData";

/**
 * Custom hook for grade management
 * Handles all grade state and calculations
 * Created by: Member 3
 */
export const useGrades = () => {
  const [grades, setGrades] = useState<Grade[]>(mockGrades);

  const addGrade = (course: string, score: number) => {
    if (course.trim() && score >= 0 && score <= 100) {
      const newGrade: Grade = {
        id: Date.now().toString(),
        course,
        score,
      };
      setGrades([...grades, newGrade]);
    }
  };

  const deleteGrade = (id: string) => {
    setGrades(grades.filter((g) => g.id !== id));
  };

  const getAverageGrade = (): number => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g.score, 0);
    return Math.round((sum / grades.length) * 10) / 10;
  };

  const getGradeColor = (score: number): string => {
    if (score >= 90) return "#4ECDC4"; // A
    if (score >= 80) return "#95E1D3"; // B
    if (score >= 70) return "#FFE66D"; // C
    return "#FF6B6B"; // F
  };

  return {
    grades,
    addGrade,
    deleteGrade,
    getAverageGrade,
    getGradeColor,
  };
};
