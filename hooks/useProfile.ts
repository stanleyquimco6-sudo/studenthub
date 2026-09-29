import { useState, useEffect } from "react";
import type { UserProfile, GroupMember } from "../types";
import { mockGroupMembers } from "../constants/mockData";

/**
 * Custom hook for profile management
 * Handles user profile state and group member data
 * Created by: Member 5
 */
export const useProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Your Name",
    role: "Your Role",
  });

  const [groupMembers] = useState<GroupMember[]>(mockGroupMembers);

  // useEffect demonstrates component lifecycle - loads saved profile on mount
  useEffect(() => {
    // In a real app, this would load from localStorage or backend
    // For now, we just initialize with default values
  }, []);

  const updateProfile = (name: string, role: string) => {
    if (name.trim()) {
      setUserProfile({ name, role });
      // In a real app, would save to localStorage here
    }
  };

  return {
    userProfile,
    groupMembers,
    updateProfile,
  };
};
