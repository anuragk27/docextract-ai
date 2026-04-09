# 🤖 AI Document Parser

AI Document Parser is a modern React-based web application that intelligently extracts key information from documents like PDFs and Word files using advanced AI capabilities.

It simplifies the process of finding important details such as names, issue dates, and expiry dates — even from unstructured or complex document layouts.

---

## 🚀 Features

- 📄 **Multi-Format Support**
  - Upload and process both **PDF** and **Word (.docx)** files

- 🧠 **AI-Powered Extraction**
  - Automatically extracts:
    - Name
    - Issue Date
    - Expiry Date
  - Works even with messy or unstructured data

- 🎯 **Accurate Results**
  - Uses structured JSON schema for reliable extraction
  - Displays **confidence score** for transparency

- 📊 **Smart Summary**
  - Generates a short AI-based summary of the document

- 🎨 **Modern UI/UX**
  - Clean and professional interface
  - Drag-and-drop file upload
  - Smooth animations
---

## 🛠️ Tech Stack

### Frontend
- React 19
- Tailwind CSS 4

### AI & Processing
- Google Gemini 3 Flash (via `@google/genai`)
- Mammoth.js (for Word document parsing)

### UI & Experience
- Lucide React (icons)
- Framer Motion (animations)

---

## 📂 How It Works

1. User uploads a document (PDF or DOCX)
2. File is processed:
   - DOCX → parsed using Mammoth.js
   - PDF → analyzed using Gemini AI
3. AI extracts structured data using a predefined JSON schema
4. Results displayed on UI:
   - Extracted fields
   - Confidence score
   - Document summary

---

## 📸 Screenshot

<img width="1724" height="915" alt="project" src="https://github.com/user-attachments/assets/bba5f2a3-4f25-4469-bb9e-1a1ad234d4b8" />


---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ai-document-parser.git

# Navigate to project folder
cd ai-document-parser

# Install dependencies
npm install

# Start development server
npm run dev
