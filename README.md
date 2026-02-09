<div align="center">
  
  <img src="./public/img/logo-aidit-light.png" alt="AIDIT Logo" width="400"/>
  
  # AIDIT - AI Penetration Testing Assistant
  
  **Artificial Intelligence by Adit**
  
  *AI-powered penetration testing assistant untuk analisis keamanan yang profesional*
  
</div>

## 📋 Tentang AIDIT

AIDIT adalah aplikasi web berbasis AI yang dirancang khusus untuk membantu profesional keamanan siber dalam melakukan analisis kerentanan dan penetration testing. Aplikasi ini menyediakan asisten AI yang dapat membantu menganalisis kerentanan keamanan dengan format yang terstruktur dan profesional.

### ✨ Fitur Utama

- **🤖 AI Pentest Chat** - Chat interface untuk analisis keamanan dengan AI
- **🎯 Tiga Mode Operasi**:
  - **PRO Mode**: Analisis keamanan profesional dengan format terstruktur
  - **LAB Mode**: Mode terisolasi untuk validasi RCE minimal di environment lab
  - **LITE Mode**: Mode ringan untuk pertanyaan umum dan diskusi sederhana
- **💬 Multi-Chat Management** - Kelola multiple chat sessions dengan riwayat tersimpan
- **🎨 Theme Switching** - Dukungan tema terang/gelap dengan preferensi sistem
- **💾 Local Storage** - Riwayat chat tersimpan otomatis di browser
- **📝 Chat Management** - Rename dan hapus chat dengan mudah

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.4
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **UI Framework**: DaisyUI (Tailwind CSS)
- **AI Integration**: Do AI Agent API
- **State Management**: React Context API
- **Styling**: Tailwind CSS

## 📦 Prerequisites

- **Node.js** (versi 18 atau lebih baru)
- **npm** atau **yarn**
- **Do AI Agent** endpoint dan access key

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd aidit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env.local` di root directory dan isi dengan konfigurasi berikut:

```env
# Do AI Agent Configuration (untuk proxy Vite)
DO_AGENT_ENDPOINT=https://YOUR_AGENT_ID.agents.do-ai.run
DO_AGENT_KEY=YOUR_AGENT_ACCESS_KEY

# Opsional: Jika ingin menggunakan backend terpisah di production
# VITE_AGENT_API_URL=https://api.example.com/chat
```

**Catatan**:

- `DO_AGENT_ENDPOINT` dan `DO_AGENT_KEY` digunakan oleh proxy Vite untuk menghindari CORS
- Jangan gunakan prefix `VITE_` untuk variabel ini agar tidak ter-expose ke client bundle
- Untuk production, pertimbangkan menggunakan backend proxy terpisah

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### 5. Build untuk Production

```bash
npm run build
```

File hasil build akan berada di folder `dist/`

## 📖 Cara Penggunaan

### Mode PRO

- Gunakan untuk analisis keamanan profesional
- Output dalam format terstruktur: Vulnerability Summary, Exploitability Analysis, Impact, Mitigation
- Cocok untuk laporan keamanan formal

### Mode LAB

- Gunakan hanya di environment lab yang terisolasi
- Validasi RCE minimal dengan satu payload
- Tidak untuk production atau environment shared

### Mode LITE

- Mode ringan untuk pertanyaan umum
- Jawaban lebih sederhana tanpa format vulnerability analysis
- Cocok untuk diskusi cepat dan pertanyaan umum

### Manajemen Chat

- **New Chat**: Klik tombol "New Chat" di sidebar untuk membuat chat baru
- **Rename Chat**: Hover pada chat di sidebar, klik icon pensil untuk rename
- **Hapus Chat**: Hover pada chat di sidebar, klik icon trash untuk menghapus
- **Switch Chat**: Klik pada chat di sidebar untuk membuka chat tersebut

### Toggle Mode

- Klik dropdown "Mode" di sidebar (di atas dropdown tema)
- Pilih antara PRO, LAB, atau LITE mode

### Toggle Theme

- Klik dropdown "Tema" di sidebar
- Pilih antara System, Terang, atau Gelap

## 🏗️ Struktur Project

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
├── prompts.ts         # AI prompts untuk berbagai mode
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── vite.config.ts     # Vite configuration
```

## 👨‍💻 Creator

**AIDIT** dibuat oleh:

- **Nama**: Aditya Pratama
- **Unit Kerja**: Layanan Data dan Sistem Informasi
- **Institusi**: Universitas Pattimura

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi dari komunitas! AIDIT adalah proyek open source yang bertujuan untuk membantu komunitas keamanan siber.

### Cara Berkontribusi

1. **Fork** repository ini
2. **Clone** fork Anda ke local machine
3. **Buat branch** baru untuk fitur atau perbaikan (`git checkout -b feature/AmazingFeature`)
4. **Commit** perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
5. **Push** ke branch (`git push origin feature/AmazingFeature`)
6. **Buka Pull Request**

### Area Kontribusi yang Dibutuhkan

- 🐛 **Bug Fixes** - Perbaikan bug dan error handling
- ✨ **New Features** - Fitur baru yang dapat meningkatkan pengalaman pengguna
- 📚 **Documentation** - Perbaikan dan penambahan dokumentasi
- 🎨 **UI/UX Improvements** - Peningkatan antarmuka dan pengalaman pengguna
- 🔒 **Security Enhancements** - Peningkatan keamanan aplikasi
- 🌐 **Internationalization** - Dukungan multi-bahasa
- ⚡ **Performance Optimization** - Optimasi performa aplikasi
- 🧪 **Testing** - Penambahan unit tests dan integration tests

### Guidelines untuk Kontribusi

- Ikuti struktur kode yang sudah ada
- Gunakan TypeScript untuk type safety
- Tulis kode yang clean dan mudah dibaca
- Tambahkan komentar untuk kode yang kompleks
- Test perubahan Anda sebelum submit PR
- Update dokumentasi jika diperlukan

### Melaporkan Bug

Jika Anda menemukan bug, silakan buka [Issue](../../issues) dengan detail:

- Deskripsi bug
- Langkah reproduksi
- Expected behavior
- Actual behavior
- Screenshot (jika ada)
- Environment (OS, Browser, Node version)

### Request Fitur Baru

Untuk request fitur baru, buka [Issue](../../issues) dengan label `enhancement` dan jelaskan:

- Deskripsi fitur yang diinginkan
- Use case dan manfaat
- Mockup atau contoh (jika ada)

## 📝 License

Proyek ini menggunakan license yang memungkinkan penggunaan dan modifikasi untuk tujuan pendidikan dan penelitian.

## 🙏 Acknowledgments

- Do AI untuk API Agent yang powerful
- DaisyUI untuk komponen UI yang elegant
- React dan Vite communities untuk tools yang luar biasa
- Semua kontributor yang telah membantu mengembangkan AIDIT

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk komunitas keamanan siber Indonesia</p>
  <p><strong>Mari bersama-sama membuat AIDIT lebih baik!</strong></p>
</div>
