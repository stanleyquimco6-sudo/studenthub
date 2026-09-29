<<<<<<< HEAD
# StudentHub 📱

A beginner-friendly React Native + Expo mobile app for college students to manage tasks, grades, notes, and group information.

**Designed for a 5-member college group project** – organized for GitHub collaboration with clear member responsibilities.

## 🎯 Quick Start

### Prerequisites
- Node.js (v18+)
- Git
- Expo CLI: `npm install -g expo-cli`

### Setup (5 minutes)

```bash
# 1. Clone the repo
git clone https://github.com/your-org/studenthub.git
cd studenthub

# 2. Install dependencies
npm install

# 3. Create your feature branch (see TEAM_ASSIGNMENT_SUMMARY.md)
git checkout -b feature/your-branch

# 4. Start development
npm run start
```

Then press `i` for iOS, `a` for Android, or `w` for web.

## ✨ Features

### 📊 Dashboard
Quick overview of all your academic data in one place

### ✅ Tasks
Create and track assignments and study tasks

### 📈 Grades
Log course grades and see your average

### 📝 Notes
Organize notes by subject

### 👤 Profile
Manage your profile and view group members

### ℹ️ About
Learn about the app and features

## 👥 Team Structure

| Member | Branch | Focus |
|--------|--------|-------|
| **1** | `feature/dashboard-navigation` | Navigation & Dashboard |
| **2** | `feature/task-manager` | Task Management |
| **3** | `feature/grade-calculator` | Grade Tracking |
| **4** | `feature/notes-manager` | Notes |
| **5** | `feature/profile-components` | Profile, About & Components |

**👉 See [TEAM_ASSIGNMENT_SUMMARY.md](TEAM_ASSIGNMENT_SUMMARY.md) for detailed assignments**

## 📖 Documentation

- **[TEAM_ASSIGNMENT_SUMMARY.md](TEAM_ASSIGNMENT_SUMMARY.md)** - Detailed member assignments
- **[COLLABORATION.md](COLLABORATION.md)** - Team collaboration rules
- **[TEAM_SETUP.md](TEAM_SETUP.md)** - Setup guide & troubleshooting
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Feature roadmap & expansion ideas

## 🛠️ Development

### Quality Checks

```bash
npm run lint              # Check code style
npx tsc --noEmit          # Check TypeScript
```

### Platform Testing

```bash
npm run ios               # iOS Simulator
npm run android           # Android Emulator
npm run web               # Web Browser
```

## 📁 Project Structure

```
app/                  # Expo Router screens
├── _layout.tsx       # Navigation (Member 1)
├── index.tsx         # Dashboard (Member 1)
├── tasks.tsx         # Tasks (Member 2)
├── grades.tsx        # Grades (Member 3)
├── notes.tsx         # Notes (Member 4)
├── profile.tsx       # Profile (Member 5)
└── about.tsx         # About (Member 5)

components/           # Reusable components (Member 5)
hooks/                # Custom state hooks
constants/            # Shared constants
types/                # TypeScript definitions
```

## 🔄 Git Workflow

1. **Create your feature branch** (see assignments above)
2. **Make meaningful commits**
3. **Push regularly** `git push -u origin feature/your-branch`
4. **Create Pull Request**
5. **Get code review** (1+ approval)
6. **Merge to main**

## ✅ Before Pushing

```bash
npm run lint
npx tsc --noEmit
npm run start
# Test your changes manually
```

## 🚀 Stack

- **React Native** - Cross-platform mobile
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **TypeScript** - Type-safe code
- **React Hooks** - State management

## 💡 Key Concepts Taught

✅ React Native components  
✅ useState & useEffect hooks  
✅ Custom hooks  
✅ Expo Router navigation  
✅ Dark/light mode  
✅ Mobile UI patterns  
✅ Team collaboration with Git  

## 📱 No Backend

StudentHub uses local state only:
- No server required
- No database needed
- Runs in Expo Go
- Perfect for learning

## 🎓 Learning Path

**Week 1-2:** Build MVP features  
**Week 3-4:** Code review & bug fixes  
**Week 5-6:** Add enhancements (see [DEVELOPMENT.md](DEVELOPMENT.md))  
**Week 7-8:** Polish & documentation  

## ❓ Need Help?

1. Check **[TEAM_SETUP.md](TEAM_SETUP.md)** for common issues
2. Read **[COLLABORATION.md](COLLABORATION.md)** for team rules
3. Ask in GitHub Issues
4. Team meeting Q&A

## 📊 Status

**Version:** 1.0.0 (MVP)  
**Status:** ✅ Ready for team development  
**Last Updated:** Project Kickoff  

---

**Made with ❤️ by a 5-member college group**

Start with **[TEAM_ASSIGNMENT_SUMMARY.md](TEAM_ASSIGNMENT_SUMMARY.md)** to understand your role!
=======
# studenthub
>>>>>>> eb428c79ea01652028c7aefc2f991f621625ab4b
