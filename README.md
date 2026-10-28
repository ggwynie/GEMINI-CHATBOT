# Gemini AI Chatbot

Chatbot berbasis Google Gemini AI dengan antarmuka web sederhana.

## Fitur

- 💬 Chat interaktif dengan Gemini AI
- 🧠 Menyimpan riwayat percakapan
- 🎨 Antarmuka modern dan responsif
- 🇮🇩 Respon dalam Bahasa Indonesia

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat file `.env` dan tambahkan API key Gemini Anda:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Dapatkan API key dari [Google AI Studio](https://makersuite.google.com/app/apikey)

## Menjalankan Aplikasi

```bash
node index.js
```

Server akan berjalan di `http://localhost:3000`

## Teknologi

- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **Frontend**: Vanilla JavaScript, HTML5, CSS3

## Keamanan

⚠️ **PENTING**: Jangan pernah commit file `.env` ke repository public!
- File `.env` sudah ada di `.gitignore`
- Gunakan `.env.example` sebagai template

## Lisensi

ISC
