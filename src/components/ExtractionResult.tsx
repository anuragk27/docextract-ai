import React from 'react';
import { Calendar, User, ShieldCheck, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { ExtractedDetails } from '@/src/services/gemini';
import { cn } from '@/src/lib/utils';

interface ExtractionResultProps {
  data: ExtractedDetails;
  fileName: string;
}

export function ExtractionResult({ data, fileName }: ExtractionResultProps) {
  const items = [
    // {
    //   label: 'Name',
    //   value: data.name,
    //   icon: User,
    //   color: 'text-blue-600',
    //   bg: 'bg-blue-50',
    // },
    {
      label: 'Issue Date',
      value: data.issueDate,
      icon: Calendar,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Expiry Date',
      value: data.expiryDate,
      icon: ShieldCheck,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto mt-8 space-y-6"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-0 border-bottom border-slate-100 bg-slate-50/50 flex items-center justify-between">
          {/* <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
              {fileName}
            </span>
          </div> */}
          {/* <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              data.confidence > 0.8 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            )}>
              {data.confidence > 0.8 ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
              {Math.round(data.confidence * 100)}% Confidence
            </div>
          </div> */}
        </div>

        {/* <div className="p-6"> */}
          {/* <p className="text-slate-600 text-sm mb-8 leading-relaxed italic">
            "{data.summary}"
          </p> */}

          <div className="grid gap-4">
            {items.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div className={cn("p-3 rounded-lg", item.bg, item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className={cn(
                    "text-base font-semibold truncate",
                    item.value ? "text-slate-900" : "text-slate-400 italic font-normal"
                  )}>
                    {item.value || 'Not found'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        {/* </div> */}
      </div>
    </motion.div>
  );
}
