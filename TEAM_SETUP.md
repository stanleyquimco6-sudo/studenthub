# StudentHub - Team Setup Guide

## 🚀 Getting Started for the Team

Welcome to the StudentHub project! This guide will help you set up the project locally and understand the team structure.

---

## ✅ Prerequisites

Before starting, make sure you have:
- Node.js (v18 or later)
- npm or yarn
- Git
- A text editor (VS Code recommended)
- Expo CLI: `npm install -g expo-cli`

---

## 📦 Initial Setup (Do This Once)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/studenthub.git
cd studenthub
```

### 2. Install Dependencies

```bash
npm install
```

If you encounter issues, try:

```bash
npm install --legacy-peer-deps
```

### 3. Verify Installation

```bash
npm run lint
npx tsc --noEmit
```

Both commands should complete without errors.

---

## 👥 Team Member Quick Start

Each team member should:

1. **Clone the repository** (step 1-2 above)
2. **Create your feature branch** (see below)
3. **Install dependencies** (step 2 above)
4. **Check out your assigned branch**

### Creating Your Feature Branch

Replace `your-name` and `your-feature` with your info:

```bash
git checkout -b feature/your-feature-name
```

**Branch names by member:**

| Member | Branch Name |
|--------|------------|
| Member 1 | `feature/dashboard-navigation` |
| Member 2 | `feature/task-manager` |
| Member 3 | `feature/grade-calculator` |
| Member 4 | `feature/notes-manager` |
| Member 5 | `feature/profile-components` |

---

## 🔄 Development Workflow

### Before You Start Working

```bash
git pull origin main
git checkout -b feature/your-branch-name
```

### While Working

**Run the development server:**

```bash
npm run start
```

Then choose your platform:
- `i` for iOS
- `a` for Android
- `w` for web

**Check your work:**

```bash
npm run lint          # Check code style
npx tsc --noEmit      # Check TypeScript types
```

### Before Pushing

```bash
npm run lint
npx tsc --noEmit
```

Fix any issues, then commit and push:

```bash
git add .
git commit -m "feat: your feature description"
git push -u origin feature/your-branch-name
```

### Creating a Pull Request

1. Go to GitHub
2. Click "New Pull Request"
3. Select `main` as base, your branch as compare
4. Fill out the PR template
5. Request review from another team member

---

## 📁 Project Structure

```
StudentHub/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Navigation root (Member 1)
│   ├── index.tsx          # Dashboard (Member 1)
│   ├── tasks.tsx          # Tasks screen (Member 2)
│   ├── grades.tsx         # Grades screen (Member 3)
│   ├── notes.tsx          # Notes screen (Member 4)
│   ├── profile.tsx        # Profile screen (Member 5)
│   └── about.tsx          # About screen (Member 5)
│
├── components/            # Reusable UI components (Member 5)
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── ThemedText.tsx
│   ├── StatCard.tsx
│   ├── InputField.tsx
│   ├── IconButton.tsx
│   └── index.ts
│
├── hooks/                 # Custom state management hooks
│   ├── useTasks.ts       # Member 2
│   ├── useGrades.ts      # Member 3
│   ├── useNotes.ts       # Member 4
│   ├── useProfile.ts     # Member 5
│   └── index.ts
│
├── constants/             # Shared constants (Member 5)
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── mockData.ts
│   └── index.ts
│
├── types/                 # TypeScript definitions (Member 5)
│   └── index.ts
│
├── COLLABORATION.md       # Team collaboration guide
├── TEAM_SETUP.md         # This file
└── package.json
```

---

## 📝 Key Rules

### DO:
✅ Work only on your assigned files  
✅ Create meaningful commits  
✅ Test your changes locally  
✅ Write clear PR descriptions  
✅ Review other members' PRs  
✅ Communicate in PR comments  

### DON'T:
❌ Modify another member's screen without discussion  
❌ Change the navigation without Member 1's approval  
❌ Add dependencies without team discussion  
❌ Force push or rebase main  
❌ Ignore TypeScript or lint errors  
❌ Merge your own PR (get review first)  

---

## 🐛 Troubleshooting

### "Cannot find module"
Make sure you've run `npm install`

### "TypeScript errors"
Run `npx tsc --noEmit` to see detailed errors

### "Lint errors"
Run `npm run lint` and fix issues, or run `npm run lint -- --fix` to auto-fix

### "Merge conflicts"
Contact the other member, resolve together, test before merging

### "Port already in use"
Kill the process or use: `npm run start -- -p 19001`

---

## 📞 Communication

- **GitHub Issues** - Report bugs and request features
- **PR Comments** - Discuss code changes
- **Pull Request Reviews** - Give feedback before merging
- **Team Meetings** - Weekly sync on progress

---

## 📚 Quick Commands Reference

```bash
# Setup
npm install

# Development
npm run start              # Start dev server
npm run ios               # Run on iOS simulator
npm run android           # Run on Android
npm run web               # Run on web

# Quality checks
npm run lint              # Check code style
npx tsc --noEmit          # Check types
npx expo-doctor           # Diagnose issues

# Git workflow
git checkout -b feature/name          # Create branch
git add .                             # Stage changes
git commit -m "feat: description"     # Commit
git push -u origin feature/name       # Push
```

---

## 🎯 Success Criteria

Your feature is ready to merge when:

- ✅ All files in your responsibility are complete
- ✅ No console errors or warnings
- ✅ Lint passes: `npm run lint`
- ✅ Types pass: `npx tsc --noEmit`
- ✅ Feature tested on dev server
- ✅ PR reviewed by at least 1 other member
- ✅ All commits are meaningful (no "fix", "update", etc.)

---

## 📖 Additional Resources

- **Expo Docs**: https://docs.expo.dev/
- **Expo Router Guide**: https://docs.expo.dev/router/introduction/
- **React Native Docs**: https://reactnative.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

## 🎓 Learning Goals

As you build StudentHub, you'll learn:

- ✅ React Native fundamentals
- ✅ Expo and Expo Router
- ✅ Component-based architecture
- ✅ State management with hooks
- ✅ Collaborative development with Git/GitHub
- ✅ TypeScript in React Native
- ✅ Mobile-first UI design

---

**Last Updated**: Project Kickoff  
**Questions?** Ask in the GitHub Discussions or at your next team meeting!
