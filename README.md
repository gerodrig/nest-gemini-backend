<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

# Gemini API Backend

This project is a powerful backend built with NestJS that provides a robust interface to the Google Gemini API. It allows you to easily integrate advanced AI capabilities into your applications, including basic and chat-based prompts, streaming responses, and image generation.

## ✨ Features

- **Basic Prompt:** Send a simple text prompt to the Gemini model and get a direct response.
- **Streaming Prompts:** Handle real-time data streams for dynamic and interactive experiences.
- **Chat Functionality:** Maintain conversational context with chat history support.
- **Image Generation:** Create images from text descriptions using the latest AI models.
- **File Uploads:** Support for multimodal inputs, allowing you to include files in your prompts.
- **Scalable Architecture:** Built with NestJS, ensuring a modular and maintainable codebase.

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [pnpm](https://pnpm.io/installation)
- A [Google Gemini API Key](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gemini-backend.git
   cd gemini-backend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Configuration

1. **Create a `.env` file** from the template:
   ```bash
   cp .env.template .env
   ```

2. **Add your Gemini API key** to the `.env` file:
   ```env
   GEMINI_API_KEY="YOUR_API_KEY"
   API_URL="http://localhost:3000"
   ```

### Running the Application

- **Development Mode:**
  ```bash
  pnpm run start:dev
  ```

- **Production Mode:**
  ```bash
  pnpm run build
  pnpm run start:prod
  ```

The application will be available at `http://localhost:3000`.

## 🛠️ API Endpoints

Here are the available endpoints to interact with the Gemini API.

---

### **Basic Prompt**

Send a single prompt and receive a complete response.

- **Endpoint:** `POST /gemini/basic-prompt`
- **Body:**
  ```json
  {
    "prompt": "Explain the theory of relativity in simple terms."
  }
  ```

---

### **Basic Prompt (Streaming)**

Send a prompt and receive a response as a stream of data.

- **Endpoint:** `POST /gemini/basic-prompt-stream`
- **Body:** `multipart/form-data`
  - `prompt` (string): The text prompt.
  - `files` (file array, optional): Images or other files to include.

---

### **Chat (Streaming)**

Engage in a conversation with streaming responses.

- **Endpoint:** `POST /gemini/chat-stream`
- **Body:** `multipart/form-data`
  - `chatId` (string): A unique identifier for the chat session.
  - `prompt` (string): The user's message.
  - `files` (file array, optional): Files to include in the message.

---

### **Get Chat History**

Retrieve the message history for a specific chat session.

- **Endpoint:** `GET /gemini/chat-history/:chatId`
- **Example:** `GET /gemini/chat-history/123e4567-e89b-12d3-a456-426614174000`

---

### **Image Generation**

Generate an image based on a text prompt.

- **Endpoint:** `POST /gemini/image-generation`
- **Body:** `multipart/form-data`
  - `prompt` (string): A description of the image to generate.
  - `files` (file array, optional): Reference images.

## 💻 Technologies Used

- **[NestJS](https://nestjs.com/):** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **[Google Gemini API](https://ai.google.dev/):** The powerful AI model behind the application's features.
- **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript.
- **[pnpm](https://pnpm.io/):** A fast, disk space-efficient package manager.

## 📄 License

This project is licensed under the UNLICENSED License. See the `LICENSE` file for more details.

---
