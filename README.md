# StudentHub 📱

A feature-rich React Native + Expo mobile app for college students to manage study sessions, tasks, notes, and more with a beautiful, responsive UI.

## 🎯 Features

### 📚 Study Planner
- **Timer System** - Track study sessions with real-time countdown
- **Audio Notifications** - Get alerted when study time is complete (beeps on web, haptic + audio on mobile)
- **Calendar Date Picker** - Easy date selection with month/year navigation
- **Session Management** - Add, edit, delete study sessions
- **Priority Levels** - Categorize by Low, Medium, High priority
- **Statistics Dashboard** - View total, completed, and pending sessions
- **Auto-complete at Top** - Newly added sessions appear at the top of the list

### ✅ Tasks
- **Quick Task Management** - Create and track assignments
- **Mark Complete** - Check off completed tasks
- **Edit & Delete** - Full CRUD operations
- **Persistent State** - Tasks appear at top when added
- **Header Image** - Visual task management header

### 📝 Notes
- **Organize by Subject** - Group notes by course
- **Rich Note Creation** - Add subject, title, and content
- **Search Capability** - Find notes easily
- **New at Top** - Newly created notes appear first
- **Header Image** - Beautiful notes header

### 👤 Profile
- **User Information** - Display profile details
- **Quick Stats** - See study progress at a glance
- **Modern Card Layout** - Clean, modern design
- **Info Badges** - Quick reference information

### ℹ️ About
- **Group Information** - Meet the team
- **Member Names** - List of Group 4 members
- **App Features Overview** - Learn what StudentHub offers

### 🎨 Dashboard
- **Real-time Overview** - See all your academic data
- **Animated Cards** - Smooth fade, slide, and scale animations
- **Bouncy Pulse Animation** - Continuous eye-catching course card animation
- **Student Profile Image** - Personalized dashboard header
- **Quick Stats** - Total sessions, completed, and pending count

## 🚀 Technical Highlights

### Animations
- **Initial Load** - Fade in + slide up + scale (600ms)
- **Continuous** - Bouncy pulse on course card (5-second cycle)
- **Native Driver** - Smooth 60fps animations with no performance impact

### Audio & Notifications
- **Cross-Platform** - Works on iOS, Android, and web
- **Multiple Methods**:
  - Haptic feedback (vibration on mobile)
  - Web Audio API beeps (on browsers)
  - Data URI sound playback (in Expo Go)
- **Auto-trigger** - Sound plays when timer reaches 0
- **Manual Trigger** - Also plays when pressing "Complete" button

### UI/UX
- **Dark Mode Support** - Automatically adapts to system theme
- **Responsive Design** - Works on phones, tablets, and web
- **Header Images** - Beautiful cover images on each screen
- **Color-coded Priority** - Visual priority indicators
- **Modern Components** - Cards, badges, and modals with smooth transitions

### Calendar Picker
- **Touch-friendly** - Easy date selection
- **Month Navigation** - Prev/next month buttons
- **Visual Feedback** - Selected date highlighted in blue
- **Modal Design** - Doesn't interfere with form flow

### Timer System
- **Real-time Countdown** - Seconds counted down live
- **Play/Pause Control** - Start and stop as needed
- **Complete & Mark** - Finish timer and mark session done automatically
- **Stop Button** - Cancel without marking complete
- **Progress Bar** - Visual timer progress indicator

## 📁 Project Structure

```
app/
├── _layout.tsx          # Navigation tabs
├── index.tsx            # Dashboard with animations
├── grades.tsx           # Study Planner (timer + calendar)
├── tasks.tsx            # Task management
├── notes.tsx            # Notes organizer
├── profile.tsx          # Profile screen (redesigned)
└── about.tsx            # About with Group 4 info

components/
├── Button.tsx
├── Card.tsx
├── DashboardCard.tsx
├── IconButton.tsx
├── InputField.tsx
├── StatCard.tsx
├── StudentAvatar.tsx
└── ThemedText.tsx

constants/
├── colors.ts
├── spacing.ts
├── typography.ts
└── mockData.ts

hooks/
├── useGrades.ts
├── useNotes.ts
├── useProfile.ts
├── useTasks.ts
└── index.ts

assets/
├── images/
│   ├── student.jpg
│   ├── forstudyplanner.jpg
│   ├── fortask.jpg
│   └── fornotes.png
└── sounds/
    └── notification.wav
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Quick Start

```bash
# 1. Navigate to project
cd studenthub

# 2. Install dependencies
npm install

# 3. Start development
npm run start

# 4. Run on device
# Press 'i' for iOS, 'a' for Android, or 'w' for web
```

## 🎮 Testing on Expo Go

1. Download **Expo Go** on your phone
2. Scan the QR code from `npm run start`
3. App loads instantly - no build needed!

## ✅ Quality Checks

```bash
npm run lint              # ESLint code style
npx tsc --noEmit          # TypeScript type checking
npm run start             # Visual testing
```
## 🎨 Color Scheme

### Light Mode
- Background: `#f9f9f9`
- Cards: `#ffffff`
- Text: `#000000`
- Primary: `#007AFF`

### Dark Mode
- Background: `#1a1a1a`
- Cards: `#2a2a2a`
- Text: `#ffffff`
- Primary: `#007AFF`

## 📦 Dependencies

### Core
- `react-native` - Mobile framework
- `expo` - Development platform
- `expo-router` - File-based routing

### Features
- `@expo/vector-icons` - Icon library (MaterialIcons, MaterialCommunityIcons)
- `expo-haptics` - Vibration feedback
- `expo-av` - Audio playback for notifications

### UI/State
- `react-native-reanimated` - Advanced animations
- `react-native-gesture-handler` - Gesture support


```
app/
├── _layout.tsx          # Navigation tabs
├── index.tsx            # Dashboard with animations
├── grades.tsx           # Study Planner (timer + calendar)
├── tasks.tsx            # Task management
├── notes.tsx            # Notes organizer
├── profile.tsx          # Profile screen (redesigned)
└── about.tsx            # About with Group 4 info

components/
├── Button.tsx
├── Card.tsx
├── DashboardCard.tsx
├── IconButton.tsx
├── InputField.tsx
├── StatCard.tsx
├── StudentAvatar.tsx
└── ThemedText.tsx

constants/
├── colors.ts
├── spacing.ts
├── typography.ts
└── mockData.ts

hooks/
├── useGrades.ts
├── useNotes.ts
├── useProfile.ts
├── useTasks.ts
└── index.ts

assets/
├── images/
│   ├── student.jpg
│   ├── forstudyplanner.jpg
│   ├── fortask.jpg
│   └── fornotes.png
└── sounds/
    └── notification.wav
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Quick Start

```bash
# 1. Navigate to project
cd studenthub

# 2. Install dependencies
npm install

# 3. Start development
npm run start

# 4. Run on device
# Press 'i' for iOS, 'a' for Android, or 'w' for web
```

## 🎮 Testing on Expo Go

1. Download **Expo Go** on your phone
2. Scan the QR code from `npm run start`
3. App loads instantly - no build needed!

## ✅ Quality Checks

```bash
npm run lint              # ESLint code style
npx tsc --noEmit          # TypeScript type checking
npm run start             # Visual testing
```

## 🎨 Color Scheme

### Light Mode
- Background: `#f9f9f9`
- Cards: `#ffffff`
- Text: `#000000`
- Primary: `#007AFF`

### Dark Mode
- Background: `#1a1a1a`
- Cards: `#2a2a2a`
- Text: `#ffffff`
- Primary: `#007AFF`

## 📦 Dependencies

### Core
- `react-native` - Mobile framework
- `expo` - Development platform
- `expo-router` - File-based routing

### Features
- `@expo/vector-icons` - Icon library (MaterialIcons, MaterialCommunityIcons)
- `expo-haptics` - Vibration feedback
- `expo-av` - Audio playback for notifications

### UI/State
- `react-native-reanimated` - Advanced animations
- `react-native-gesture-handler` - Gesture support

## 🔄 Recent Changes

### Study Planner Enhancements
✅ Replaced Grade Calculator with Study Planner  
✅ Added working timer system (start, pause, complete, stop)  
✅ Implemented audio notifications for completion  
✅ Added calendar date picker modal  
✅ Fixed button layout to fit all screen sizes  
✅ Made newly added sessions appear at top  

### Dashboard Improvements
✅ Added student profile image header  
✅ Implemented smooth animations (fade, slide, scale)  
✅ Added continuous bouncy pulse on course card  
✅ Responsive design for mobile and web  

### Profile & About
✅ Redesigned Profile with modern card layout  
✅ Updated About screen with Group 4 members  
✅ Removed Learning Concepts section  
✅ Added member names (roles removed)  

### Tasks & Notes
✅ Updated to show new items at top  
✅ Added header images to both screens  
✅ Responsive layout for all devices  

### General
✅ Fixed all TypeScript errors  
✅ Resolved git merge conflicts  
✅ Cleaned up unused imports  
✅ Ensured linting passes  

## 📱 Supported Platforms

- ✅ iOS (via Expo Go or native build)
- ✅ Android (via Expo Go or native build)
- ✅ Web (via Expo Web)

## 🎓 Learning Outcomes

Through building StudentHub, you'll learn:
- ✅ React Native fundamentals
- ✅ Expo Router for navigation
- ✅ React Hooks (useState, useEffect, useCallback, useRef)
- ✅ Custom hooks creation
- ✅ TypeScript in React Native
- ✅ Dark/light mode implementation
- ✅ Animations with React Native Animated API
- ✅ Cross-platform audio/haptic feedback
- ✅ Responsive mobile UI design
- ✅ State management patterns

## 📊 App Stats

- **7 Screens** - Dashboard, Study Planner, Tasks, Notes, Profile, About, etc.
- **4 Components** - Card, Button, IconButton, InputField
- **3 Custom Hooks** - useGrades, useNotes, useTasks
- **100+ Styled Elements** - Buttons, cards, modals, badges
- **Dark Mode Support** - Full theme switching
- **Animations** - Multiple smooth transitions
- **Audio Notifications** - Cross-platform support

## 🚀 Future Enhancements

- Push notifications
- Data persistence (AsyncStorage)
- Cloud sync
- Social features
- Advanced analytics
- Study goal tracking
- Calendar integration

## 📝 Code Quality

- **TypeScript** - Full type safety
- **ESLint** - Code style consistency
- **React Best Practices** - Following hooks and components best practices
- **Responsive Design** - Works on all screen sizes

## 🤝 Development Notes

- All state is local (no backend required)
- Suitable for learning React Native
- Easy to extend and customize
- Well-organized component structure
- Clear naming conventions

## 📄 License

MIT License - Feel free to use and modify

## 👥 Contributors

## 🔄 Recent Changes

### Study Planner Enhancements
✅ Replaced Grade Calculator with Study Planner  
✅ Added working timer system (start, pause, complete, stop)  
✅ Implemented audio notifications for completion  
✅ Added calendar date picker modal  
✅ Fixed button layout to fit all screen sizes  
✅ Made newly added sessions appear at top  

### Dashboard Improvements
✅ Added student profile image header  
✅ Implemented smooth animations (fade, slide, scale)  
✅ Added continuous bouncy pulse on course card  
✅ Responsive design for mobile and web  

### Profile & About
✅ Redesigned Profile with modern card layout  
✅ Updated About screen with Group 4 members  
✅ Removed Learning Concepts section  
✅ Added member names (roles removed)  

### Tasks & Notes
✅ Updated to show new items at top  
✅ Added header images to both screens  
✅ Responsive layout for all devices  

### General
✅ Fixed all TypeScript errors  
✅ Resolved git merge conflicts  
✅ Cleaned up unused imports  
✅ Ensured linting passes  

## 📱 Supported Platforms

- ✅ iOS (via Expo Go or native build)
- ✅ Android (via Expo Go or native build)
- ✅ Web (via Expo Web)

## 🎓 Learning Outcomes

Through building StudentHub, you'll learn:
- ✅ React Native fundamentals
- ✅ Expo Router for navigation
- ✅ React Hooks (useState, useEffect, useCallback, useRef)
- ✅ Custom hooks creation
- ✅ TypeScript in React Native
- ✅ Dark/light mode implementation
- ✅ Animations with React Native Animated API
- ✅ Cross-platform audio/haptic feedback
- ✅ Responsive mobile UI design
- ✅ State management patterns

## 📊 App Stats

- **7 Screens** - Dashboard, Study Planner, Tasks, Notes, Profile, About, etc.
- **4 Components** - Card, Button, IconButton, InputField
- **3 Custom Hooks** - useGrades, useNotes, useTasks
- **100+ Styled Elements** - Buttons, cards, modals, badges
- **Dark Mode Support** - Full theme switching
- **Animations** - Multiple smooth transitions
- **Audio Notifications** - Cross-platform support

## 🚀 Future Enhancements

- Push notifications
- Data persistence (AsyncStorage)
- Cloud sync
- Social features
- Advanced analytics
- Study goal tracking
- Calendar integration

## 📝 Code Quality

- **TypeScript** - Full type safety
- **ESLint** - Code style consistency
- **React Best Practices** - Following hooks and components best practices
- **Responsive Design** - Works on all screen sizes

## 🤝 Development Notes

- All state is local (no backend required)
- Suitable for learning React Native
- Easy to extend and customize
- Well-organized component structure
- Clear naming conventions

## 📄 License

MIT License - Feel free to use and modify

## 👥 Contributors

**Group 4** - College Project  
Built with React Native & Expo
