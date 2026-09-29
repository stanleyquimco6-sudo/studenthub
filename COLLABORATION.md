# StudentHub - 5-Member GitHub Collaboration Guide

## 📋 Team Structure & Responsibilities

This document outlines how the StudentHub project is organized for a 5-member college group working together on GitHub.

---

## 👥 Member Assignments

### **Member 1: Dashboard & Navigation**
**Branch:** `feature/dashboard-navigation`

**Primary Responsibilities:**
- Dashboard screen overview (app/index.tsx)
- Root navigation setup (app/_layout.tsx)
- Tab navigator configuration
- Screen header styling
- Integration point for all other features

**Main Files:**
- `app/_layout.tsx` - Tab navigation root
- `app/index.tsx` - Dashboard screen

**Avoid Modifying:**
- Individual feature screens (tasks, grades, notes, profile, about)
- Component folder
- hooks folder
- constants folder

**Key Features to Implement:**
- Dashboard overview cards
- Real-time stats aggregation from other screens
- Dark/light mode support
- Tab navigation with icons
- Header styling consistency

**Recommended Commits:**
1. `feat: set up tab-based navigation for mobile UX`
2. `feat: create dashboard overview with summary cards`
3. `feat: add dark mode support to navigation`
4. `feat: improve header styling and branding`

---

### **Member 2: Task Manager**
**Branch:** `feature/task-manager`

**Primary Responsibilities:**
- Task management screen (app/tasks.tsx)
- Task state management hook
- Task CRUD operations
- Task completion tracking

**Main Files:**
- `app/tasks.tsx` - Tasks screen
- `hooks/useTasks.ts` - Task state logic

**Avoid Modifying:**
- App navigation (_layout.tsx)
- Other feature screens
- Profile/About screens
- UI components (use existing ones)

**Key Features to Implement:**
- Add new tasks with TextInput
- Mark tasks complete/incomplete
- Delete tasks
- Display completion stats
- Filter tasks (pending/completed) - optional expansion
- Local persistence - optional expansion

**Recommended Commits:**
1. `feat: create task input form and add functionality`
2. `feat: implement task completion toggle`
3. `feat: add task deletion with confirmation`
4. `feat: display task completion statistics`
5. `refactor: extract task state logic to useTasks hook`

---

### **Member 3: Grade Calculator**
**Branch:** `feature/grade-calculator`

**Primary Responsibilities:**
- Grades screen (app/grades.tsx)
- Grade state management hook
- Grade CRUD operations
- GPA/average calculations

**Main Files:**
- `app/grades.tsx` - Grades screen
- `hooks/useGrades.ts` - Grade state logic

**Avoid Modifying:**
- App navigation (_layout.tsx)
- Other feature screens
- Task/Notes screens
- Profile/About screens

**Key Features to Implement:**
- Add grades with course name and score
- Calculate average grade across courses
- Delete grades
- Color-coded grade display (A/B/C/D)
- Display grade statistics
- Grade history/trends - optional expansion
- GPA calculation - optional expansion

**Recommended Commits:**
1. `feat: create grade input form with validation`
2. `feat: implement grade calculation and averaging`
3. `feat: add color-coded grade display (A-F scale)`
4. `feat: implement grade deletion`
5. `refactor: extract grade state logic to useGrades hook`

---

### **Member 4: Notes Manager**
**Branch:** `feature/notes-manager`

**Primary Responsibilities:**
- Notes screen (app/notes.tsx)
- Notes state management hook
- Note CRUD operations
- Note organization by subject

**Main Files:**
- `app/notes.tsx` - Notes screen
- `hooks/useNotes.ts` - Notes state logic

**Avoid Modifying:**
- App navigation (_layout.tsx)
- Other feature screens
- Task/Grades screens
- Profile/About screens

**Key Features to Implement:**
- Create notes with subject, title, and content
- Display notes with subject tags
- Delete notes
- Count total notes
- Note preview/expansion - optional
- Search/filter notes by subject - optional
- Note categories - optional expansion

**Recommended Commits:**
1. `feat: create note input form with multi-line text`
2. `feat: implement note display with subject tags`
3. `feat: add note deletion functionality`
4. `feat: display note count and statistics`
5. `refactor: extract note state logic to useNotes hook`

---

### **Member 5: Profile, About & Reusable Components**
**Branch:** `feature/profile-components`

**Primary Responsibilities:**
- Profile screen (app/profile.tsx)
- About screen (app/about.tsx)
- Reusable UI components
- Shared constants and styling
- Type definitions

**Main Files:**
- `app/profile.tsx` - Profile screen
- `app/about.tsx` - About screen
- `components/` - All reusable components
- `constants/` - App-wide constants
- `types/` - TypeScript type definitions

**Avoid Modifying:**
- App navigation (_layout.tsx)
- Individual feature screens (tasks, grades, notes)
- hooks folder

**Key Features to Implement:**
- Profile management (edit name/role)
- Group member display
- About page with app info
- Feature showcase
- Reusable card components
- Reusable button components
- Shared color palette
- Shared typography styles
- Type definitions for all data models
- useColorScheme hook usage

**Recommended Commits:**
1. `feat: create reusable Card component`
2. `feat: create reusable Button components`
3. `feat: set up shared color constants`
4. `feat: implement profile screen with edit mode`
5. `feat: add group members display`
6. `feat: implement about page with features`
7. `refactor: extract profile state logic to useProfile hook`

---

## 🔄 Workflow & Collaboration Rules

### Before Starting Work
1. Pull latest from `main`
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Keep your branch up-to-date with `main`

### Making Commits
- Write clear, descriptive commit messages
- Keep commits focused on one feature/fix
- Link to issue numbers if applicable: `feat: add task deletion (#123)`

### Pushing Changes
```bash
git push -u origin feature/your-branch-name
```

### Creating Pull Requests
1. Push your branch
2. Create a PR from your branch to `main`
3. Fill out the PR template completely
4. Request reviews from other team members
5. Ensure CI/CD passes (lint, type-check)
6. Squash and merge when approved

### Code Review Checklist
- [ ] Feature works as intended
- [ ] No console errors or warnings
- [ ] Code follows project style
- [ ] No unnecessary dependencies added
- [ ] Types are properly defined
- [ ] Works in both dark and light mode

---

## 📦 Shared Resources (DO NOT MODIFY without coordination)

These files should not be modified by individual members without team discussion:

- `app/_layout.tsx` - Only Member 1 modifies
- `package.json` - Only modify when adding dependencies
- `tsconfig.json` - Only modify for build settings
- `app.json` - Only modify for app configuration
- `types/` - Coordinate with Member 5 before adding types
- `constants/` - Coordinate with Member 5 before adding constants

---

## 🚀 Integration Points

### Dashboard (Member 1) receives data from:
- Tasks count & completion % (Member 2)
- Average grade (Member 3)
- Notes count (Member 4)
- Group member info (Member 5)

### Navigation (Member 1) connects to:
- All 6 screens (Members 2, 3, 4, 5)

### Components (Member 5) used by:
- All screens (Members 1-4)

### Hooks (Each member) interface with:
- Their own state
- Member 5's type definitions

---

## 🧪 Testing Before Merge

Each member should verify:
1. ✅ Their screen displays without errors
2. ✅ Their feature works correctly
3. ✅ Navigation between tabs works
4. ✅ Dark/light mode toggle works
5. ✅ No console errors or warnings
6. ✅ Type checking passes: `npx tsc --noEmit`
7. ✅ Linting passes: `npx expo lint`

---

## 📝 Commit Message Format

Use this format for consistency:

```
<type>: <subject> (#issue-number)

<body - optional>

<footer - optional>
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `style:` - Formatting changes
- `docs:` - Documentation updates
- `test:` - Test additions

Examples:
```
feat: add task completion toggle (#15)
fix: correct average grade calculation (#22)
refactor: extract task state to useTasks hook
docs: add collaboration guide
```

---

## 🔀 Merge Strategy

1. All work happens in feature branches
2. PRs are reviewed by at least 1 other team member
3. CI/CD must pass
4. Squash commits before merging to keep history clean
5. Delete branch after merging

---

## ❓ FAQ

**Q: What if I need to modify another member's file?**
A: Create an issue, discuss in PR comments, or coordinate in your team meeting. The other member should make the change if it's in their responsibility area.

**Q: Can I work on multiple screens?**
A: No. Stick to your assigned area to avoid conflicts. If something needs work outside your area, assign it as an issue for that member.

**Q: What if there's a merge conflict?**
A: Contact the other member involved, resolve it together, and test thoroughly before merging.

**Q: How do we handle bugs in production?**
A: Create an issue, assign to the responsible member, they fix it in their feature branch, create a PR, and merge to main.

---

## 📚 Quick Reference

| Member | Branch | Main Files | Screens |
|--------|--------|-----------|---------|
| 1 | `feature/dashboard-navigation` | `_layout.tsx`, `index.tsx` | Navigation, Dashboard |
| 2 | `feature/task-manager` | `tasks.tsx`, `hooks/useTasks.ts` | Tasks |
| 3 | `feature/grade-calculator` | `grades.tsx`, `hooks/useGrades.ts` | Grades |
| 4 | `feature/notes-manager` | `notes.tsx`, `hooks/useNotes.ts` | Notes |
| 5 | `feature/profile-components` | `profile.tsx`, `about.tsx`, `components/`, `constants/`, `types/` | Profile, About, Components |

---

**Last Updated:** Project kickoff
**Next Review:** After first merged PR from each member
