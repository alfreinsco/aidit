<div align="center">
  
  <img src="./public/img/logo-aidit-dark.png" alt="AIDIT Logo" width="400"/>
  
  # AIDIT - AI Penetration Testing Assistant
  
  **Artificial Intelligence by Adit**
  
  *AI-powered penetration testing assistant for professional security analysis*
  
</div>

## 📋 About AIDIT

AIDIT is an AI-powered web application specifically designed to assist cybersecurity professionals in performing vulnerability analysis and penetration testing. This application provides an AI assistant that can help analyze security vulnerabilities with structured and professional formatting.

### ✨ Key Features

- **🤖 AI Pentest Chat** - Chat interface for security analysis with AI
- **🎯 Three Operating Modes**:
  - **PRO Mode**: Professional security analysis with structured format
  - **LAB Mode**: Isolated mode for minimal RCE validation in lab environment
  - **LITE Mode**: Lightweight mode for general questions and simple discussions
- **💬 Multi-Chat Management** - Manage multiple chat sessions with saved history
- **🎨 Theme Switching** - Light/dark theme support with system preference
- **💾 Local Storage** - Chat history automatically saved in browser
- **📝 Chat Management** - Easily rename and delete chats

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.4
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **UI Framework**: DaisyUI (Tailwind CSS)
- **AI Integration**: Do AI Agent API
- **State Management**: React Context API
- **Styling**: Tailwind CSS

## 📦 Prerequisites

- **Node.js** (version 18 or newer)
- **npm** or **yarn**
- **Do AI Agent** endpoint and access key

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd aidit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and fill it with the following configuration:

```env
# Do AI Agent Configuration (for Vite proxy)
DO_AGENT_ENDPOINT=https://YOUR_AGENT_ID.agents.do-ai.run
DO_AGENT_KEY=YOUR_AGENT_ACCESS_KEY

# Optional: If you want to use a separate backend in production
# VITE_AGENT_API_URL=https://api.example.com/chat
```

**Note**: 
- `DO_AGENT_ENDPOINT` and `DO_AGENT_KEY` are used by Vite proxy to avoid CORS
- Do not use `VITE_` prefix for these variables to prevent exposure to client bundle
- For production, consider using a separate backend proxy

### 4. Run Development Server

```bash
npm run dev
```

The application will run at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

Build files will be in the `dist/` folder

## 📖 Usage Guide

### PRO Mode
- Use for professional security analysis
- Output in structured format: Vulnerability Summary, Exploitability Analysis, Impact, Mitigation
- Suitable for formal security reports

### LAB Mode
- Use only in isolated lab environment
- Minimal RCE validation with one payload
- Not for production or shared environments

### LITE Mode
- Lightweight mode for general questions
- Simpler answers without vulnerability analysis format
- Suitable for quick discussions and general questions

### Chat Management
- **New Chat**: Click the "New Chat" button in the sidebar to create a new chat
- **Rename Chat**: Hover over a chat in the sidebar, click the pencil icon to rename
- **Delete Chat**: Hover over a chat in the sidebar, click the trash icon to delete
- **Switch Chat**: Click on a chat in the sidebar to open that chat

### Toggle Mode
- Click the "Mode" dropdown in the sidebar (above the theme dropdown)
- Choose between PRO, LAB, or LITE mode

### Toggle Theme
- Click the "Tema" dropdown in the sidebar
- Choose between System, Light, or Dark

## 🏗️ Project Structure

```
aidit/
├── components/          # React components
│   ├── AiditBranding.tsx
│   ├── AiditLogo.tsx
│   ├── ChatView.tsx
│   └── Sidebar.tsx
├── context/            # React Context providers
│   ├── ChatContext.tsx
│   └── ThemeContext.tsx
├── services/           # Service layer
│   ├── agentClient.ts  # Do AI Agent client
│   └── geminiService.ts
├── public/             # Static assets
│   └── img/           # Logo files
├── prompts.ts         # AI prompts for various modes
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── vite.config.ts     # Vite configuration
```

## 👨‍💻 Creator

**AIDIT** is created by:

- **Name**: Aditya Pratama
- **Work Unit**: Layanan Data dan Sistem Informasi (Data Services and Information Systems)
- **Institution**: Universitas Pattimura

## 🤝 Contributing

We are very open to contributions from the community! AIDIT is an open source project aimed at helping the cybersecurity community.

### How to Contribute

1. **Fork** this repository
2. **Clone** your fork to your local machine
3. **Create** a new branch for your feature or fix (`git checkout -b feature/AmazingFeature`)
4. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
5. **Push** to your branch (`git push origin feature/AmazingFeature`)
6. **Open** a Pull Request

### Areas Where Contributions Are Needed

- 🐛 **Bug Fixes** - Bug fixes and error handling improvements
- ✨ **New Features** - New features that can enhance user experience
- 📚 **Documentation** - Documentation improvements and additions
- 🎨 **UI/UX Improvements** - Interface and user experience enhancements
- 🔒 **Security Enhancements** - Application security improvements
- 🌐 **Internationalization** - Multi-language support
- ⚡ **Performance Optimization** - Application performance optimization
- 🧪 **Testing** - Unit tests and integration tests additions

### Contribution Guidelines

- Follow the existing code structure
- Use TypeScript for type safety
- Write clean and readable code
- Add comments for complex code
- Test your changes before submitting a PR
- Update documentation if needed

### Reporting Bugs

If you find a bug, please open an [Issue](../../issues) with details:

- Bug description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshot (if available)
- Environment (OS, Browser, Node version)

### Requesting New Features

For new feature requests, open an [Issue](../../issues) with the `enhancement` label and describe:

- Description of the desired feature
- Use case and benefits
- Mockup or example (if available)

## 📝 License

This project uses a license that allows use and modification for educational and research purposes.

## 🙏 Acknowledgments

- Do AI for the powerful Agent API
- DaisyUI for elegant UI components
- React and Vite communities for amazing tools
- All contributors who have helped develop AIDIT

---

<div align="center">
  <p>Made with ❤️ for the cybersecurity community</p>
  <p><strong>Let's make AIDIT better together!</strong></p>
</div>
