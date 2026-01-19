import React from 'react';
import { AlertTriangle, X, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  feedback: string;
  onFeedbackChange: (val: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const FixDialog: React.FC<Props> = ({ isOpen, feedback, onFeedbackChange, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 bg-red-50 border-b border-red-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold">問題の不備を報告</h3>
          </div>
          <button onClick={onClose} className="text-red-400 hover:text-red-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            問題文、選択肢、または解説に誤りがある場合は、詳細を入力してください。AIが指摘内容を考慮して修正案を生成します。
          </p>
          <textarea
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
            placeholder="例: 正解はBではなくCです。なぜなら..."
            className="w-full h-32 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400 focus:outline-none resize-none text-sm"
            autoFocus
          />
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-sm"
          >
            キャンセル
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm shadow-sm flex items-center gap-2"
          >
            <Send className="w-3 h-3" />
            報告して修正
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixDialog;
