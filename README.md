# 🤖 Gemini AI Clone

A full-stack AI chatbot web application inspired by Google's Gemini. This clone integrates a smart conversational interface using **React.js** on the frontend, **Node.js** for the backend server, and **MongoDB** for persistent storage of user queries and responses.

## 🌐 Live Demo
Click 👉 https://gemini-ai-clone-13.vercel.app/

## 🚀 Features

- ⚡ Conversational chatbot powered by AI (e.g., OpenAI API or Gemini API)
- 💬 Real-time chat interface with smooth user experience
- 📦 Stores chat history and user interactions in MongoDB
- 🔐 Backend API built with Node.js and Express
- 🌐 Fully responsive UI built with React.js

---

## 🛠️ Tech Stack

| Layer        | Technology       |
|--------------|------------------|
| Frontend     | React.js         |
| Backend      | Node.js, Express |
| Database     | MongoDB          |
| API Integration | OpenAI or Gemini API |
| HTTP Client  | Axios            |

---

## 🗃 Directory structure
```
└── 📁backend
    └── 📁config
        ├── db.js
    └── 📁controllers
        ├── authController.js
        ├── promptController.js
        ├── resController.js
    └── 📁middleware
    └── 📁models
        ├── User.js
    └── 📁routes
        ├── auth.js
        ├── prompt.js
        ├── response.js
    ├── .env
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    ├── package.json
    └── vercel.json
└── 📁geminiclone
    └── 📁public
        ├── gemini_icon.png
        ├── vite.svg
    └── 📁src
        └── 📁assets
            ├── assets.js
            ├── bulb_icon.png
            ├── code_icon.png
            ├── compass_icon.png
            ├── gallery_icon.png
            ├── gallery_icon2.png
            ├── gemini_icon.png
            ├── history_icon.png
            ├── me1.jpg
            ├── menu_icon.png
            ├── message_icon.png
            ├── mic_icon.png
            ├── plus_icon.png
            ├── question_icon.png
            ├── react.svg
            ├── send_icon.png
            ├── setting_icon.png
            ├── user_icon.png
            ├── youtube_icon.png
        └── 📁components
            └── 📁auth
                ├── login.css
                ├── login.jsx
            └── 📁loginStatus
                ├── loginStatus.css
                ├── LoginStatus.jsx
            └── 📁logout
                ├── Logout.css
                ├── Logout.jsx
            └── 📁Main
                ├── Main.css
                ├── Main.jsx
            └── 📁Sidebar
                ├── Sidebar.css
                ├── Sidebar.jsx
        └── 📁context
            ├── dataContext.jsx
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```

---
## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- OpenAI or Gemini API Key

---

### 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/RVDhanushKumar/gemini-clone.git
   cd gemini-clone

### Set up environment variables
**Create a .env file in the server/ directory with:**

PORT=5000

MONGODB_URI=your_mongodb_connection_string

OPENAI_API_KEY=your_openai_or_gemini_api_key

### 📸 Screenshots
![image](https://github.com/user-attachments/assets/c490d390-c2ea-4579-9583-aae1d675e7c3)
