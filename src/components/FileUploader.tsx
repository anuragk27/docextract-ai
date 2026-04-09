import React, { useCallback, useState } from 'react';
import { Upload, FileText, X, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import mammoth from 'mammoth';
import { cn } from '@/src/lib/utils';

interface FileUploaderProps {
  onFileProcessed: (base64: string, mimeType: string, isTextOnly: boolean, fileName: string) => void;
  isProcessing: boolean;
}

export function FileUploader({ onFileProcessed, isProcessing }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setError(null);
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith('.doc')) {
      setError('Please upload a PDF or Word document (.doc, .docx)');
      return;
    }

    try {
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          onFileProcessed(base64, file.type, false, file.name);
        };
        reader.readAsDataURL(file);
      } else {
        // Word document - extract text
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        onFileProcessed(result.value, 'text/plain', true, file.name);
      }
    } catch (err) {
      console.error('File processing error:', err);
      setError('Failed to process file. Please try again.');
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 group",
          isDragging ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-slate-300 bg-white",
          isProcessing && "opacity-50 pointer-events-none"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={onFileChange}
          accept=".pdf,.doc,.docx"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={cn(
            "p-4 rounded-full transition-colors",
            isDragging ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
          )}>
            {isProcessing ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-slate-900">
              {isProcessing ? "Processing Document..." : "Upload your document"}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Drag and drop or click to browse (PDF, DOCX)
            </p>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
