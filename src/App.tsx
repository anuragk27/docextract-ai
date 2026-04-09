/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ExtractionResult } from './components/ExtractionResult';
import { extractDetailsFromDocument, ExtractedDetails } from './services/gemini';
import { FileText, Sparkles, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ExtractedDetails | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileProcessed = async (
    base64: string,
    mimeType: string,
    isTextOnly: boolean,
    fileName: string
  ) => {
    setIsProcessing(true);
    setError(null);
    setCurrentFileName(fileName);
    setResult(null);

    try {
      const details = await extractDetailsFromDocument(base64, mimeType, isTextOnly);
      setResult(details);
    } catch (err) {
      setError('Failed to extract information. The document might be too complex or unreadable.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setCurrentFileName('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-6"
        >
          <FileText className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4"
        >
          DocExtract <span className="text-blue-600">AI</span>
        </motion.h1>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {/* 🔵 Uploader ALWAYS visible */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FileUploader
            onFileProcessed={handleFileProcessed}
            isProcessing={isProcessing}
          />
        </motion.div>

        {/* 🔴 Error */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-100 p-8 rounded-2xl text-center max-w-md mx-auto">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-red-200 text-red-600 rounded-xl"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* 🟢 Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center"
          >
            <ExtractionResult data={result} fileName={currentFileName} />

            <button
              onClick={reset}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl"
            >
              <RefreshCcw className="w-4 h-4" />
              Clear Result
            </button>
          </motion.div>
        )}

      </main>

      {/* <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-400">
          Powered by Google Gemini AI & Mammoth.js
        </p>
      </footer> */}
    </div>
  );
}

