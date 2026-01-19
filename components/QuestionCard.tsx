import React from 'react';
import { Question, DocReference } from '../types';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import ExplanationView from './ExplanationView';

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptions: string[];
  isAnswered: boolean;
  isVerified: boolean;
  docLinks: DocReference[];
  isSearchingDocs: boolean;
  isFixing: boolean;
  isGeneratingSimilar: boolean;
  loadingSimilarError: string | null;
  onOptionClick: (id: string, max: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  onVerify: () => void;
  onFix: () => void;
  onGenerateSimilar: () => void;
}

const QuestionCard: React.FC<Props> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptions,
  isAnswered,
  isVerified,
  docLinks,
  isSearchingDocs,
  isFixing,
  isGeneratingSimilar,
  loadingSimilarError,
  onOptionClick,
  onSubmit,
  onNext,
  onVerify,
  onFix,
  onGenerateSimilar
}) => {
  const isMultiple = question.correctOptionIds.length > 1;
  const isCorrect = isAnswered && 
    selectedOptions.length === question.correctOptionIds.length &&
    selectedOptions.every(id => question.correctOptionIds.includes(id));

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden relative">
      {/* Progress Bar */}
      <div className="h-1 bg-slate-100 w-full">
        <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wide uppercase">
                    Question {currentIndex + 1} / {totalQuestions}
                </span>
                {isVerified && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                    </span>
                )}
            </div>
            <span className={`text-xs px-2 py-1 rounded border ${isMultiple ? 'border-purple-200 text-purple-600 bg-purple-50' : 'border-slate-200 text-slate-500'}`}>
                {isMultiple ? '複数選択 (2つ)' : '単一選択'}
            </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const isCorrectOption = question.correctOptionIds.includes(option.id);
            
            let baseClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group relative ";
            
            if (isAnswered) {
              if (isCorrectOption) {
                baseClass += "border-green-500 bg-green-50 text-green-900";
              } else if (isSelected && !isCorrectOption) {
                baseClass += "border-red-500 bg-red-50 text-red-900";
              } else {
                baseClass += "border-slate-100 text-slate-400 opacity-60";
              }
            } else {
              if (isSelected) {
                baseClass += "border-blue-500 bg-blue-50 text-blue-900 shadow-md transform scale-[1.01]";
              } else {
                baseClass += "border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-700";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => onOptionClick(option.id, isMultiple ? 2 : 1)}
                disabled={isAnswered}
                className={baseClass}
              >
                <span className="font-medium">{option.text}</span>
                {isAnswered && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {isAnswered && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-red-500" />}
                {!isAnswered && <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300 group-hover:border-blue-300'}`}></div>}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          {!isAnswered && (
            <button
              onClick={onSubmit}
              disabled={selectedOptions.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              回答する
            </button>
          )}
        </div>
      </div>

      {isAnswered && (
        <ExplanationView
          question={question}
          isCorrect={isCorrect}
          isVerified={isVerified}
          docLinks={docLinks}
          isSearchingDocs={isSearchingDocs}
          isFixing={isFixing}
          isGeneratingSimilar={isGeneratingSimilar}
          loadingSimilarError={loadingSimilarError}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          onNext={onNext}
          onVerify={onVerify}
          onFix={onFix}
          onGenerateSimilar={onGenerateSimilar}
        />
      )}
    </div>
  );
};

export default QuestionCard;