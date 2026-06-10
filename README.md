# 🤖 Spring AI Chat Assistant

Simple AI Chat Application built with Spring Boot, Spring AI, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- Chat with Google Gemini AI
- Spring AI integration
- React + TypeScript frontend
- Simple and responsive UI

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring AI
- Gemini API

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

## ⚙️ Configuration

Set your Gemini API Key as an environment variable:

```yaml
spring:
  ai:
    google:
      genai:
        api-key: ${API_KEY}
```

Example:

```env
API_KEY=your_gemini_api_key
```

## ▶️ Run Backend

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

## ▶️ Run Frontend

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 🔗 API

```http
GET /ask-ai?message=Hello
```

Example:

```http
http://localhost:8080/ask-ai?message=What is Spring AI?
```

## 🏗️ Architecture

```text
React
  │
  ▼
Spring Boot
  │
  ▼
Gemini API
```

## 👨‍💻 Author

Thanaphat Boonrak

GitHub: https://github.com/Thanaphat-Boonrak
