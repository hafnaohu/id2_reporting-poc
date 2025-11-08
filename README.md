📦 Reporting POC

Bilingual (English/Welsh) reporting proof-of-concept containing:

- 🖥️ Field Reports Dashboard (React + Vite + Supabase)

- 📱 Mobile Reporting App (Expo Go + React Native + Supabase)

🧩 Folder structure

reporting-poc/
│
├── report-dashboard/ # Web dashboard (Vite + React)
├── app/ # Expo Go app (React Native)
├── screens/ # Optional shared screens/components
├── shared/ # Shared logic (e.g. Supabase client, translations)
├── .gitignore
├── README.md
└── package.json # If using workspaces/monorepo setup

⚙️ Prerequisites

Before running either project, make sure you have:

- Node.js ≥ 18
- npm or yarn (npm prefered)
- Git (This repository an be used or cloned)
- Expo Go app installed on your mobile device (for the app)
- A Supabase project with your database + API keys

---

🚀 1. Run the Dashboard (Web App)
▶️ Setup (Local code, if npm insn't already installed)
$ cd report-dashboard
$ npm install

▶️ Add environment variables
Create a .env file inside report-dashboard/ with:
$ VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
$ VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

▶️ Run locally
$ npm run dev

🏗️ Build for production
$ npm run build
$ vercel deploy (to deploy the server)
$ vercel --prod (to launch the Production version)

---

📱 2. Run the Expo Go App (Mobile)
▶️ Setup
$ cd app
$ npm install

▶️ Add environment variables
Create a .env file inside app/ with:
$ EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
$ EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

▶️ Run locally
$ npx expo start

Then:

- Scan the QR code with your Expo Go app (iOS/Android), or
- Press w to open in a web preview

---

🌍 3. Bilingual Support (English/Welsh)
Both the Dashboard and App support dynamic language switching via a shared LanguageContext.

- Switch between English 🇬🇧 and Welsh 🏴 in real time
- Translations are stored in LanguageContext.js
- Comments are stored in Supabase with both comment (English) and comment_cy (Welsh)

---

🧠 4. Folder explanations
| Folder | Description |
| ------------------- | --------------------------------------------------------- |
| `report-dashboard/` | Web dashboard using Vite + React |
| `app/` | Expo Go mobile app for submitting field reports |
| `screens/` | Extra or shared React Native screens |
| `shared/` | Common logic (Supabase client, translation helpers, etc.) |

---

🛠️ 5. Useful commands
| Command | Description |
| ------------------------- | -------------------------------------- |
| `git status` | Check which files are tracked |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit your changes |
| `git push` | Push to GitHub |
| `npm run dev` | Run local dev server (dashboard) |
| `npx expo start` | Run local Expo dev server (mobile app) |

---

🧾 6. Notes

- Make sure you don’t push .env files — they’re ignored via .gitignore.
- You can safely keep both apps in one repo; GitHub Actions can build each independently if needed.
- Shared code (like Supabase config) can go into /shared.

---

👤 Author

Email: hugohafnaoui@gmail.com
GitHub: hafnaohu

---
