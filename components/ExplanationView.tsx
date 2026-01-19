import React from 'react';
import { Question, DocReference } from '../types';
import { CheckCircle2, XCircle, ShieldCheck, Shield, BookOpen, ExternalLink, Loader2, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react';

interface Props {
  question: Question;
  isCorrect: boolean;
  isVerified: boolean;
  docLinks: DocReference[];
  isSearchingDocs: boolean;
  isFixing: boolean;
  isGeneratingSimilar: boolean;
  loadingSimilarError: string | null;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onVerify: () => void;
  onFix: () => void;
  onGenerateSimilar: () => void;
}

const ExplanationView: React.FC<Props> = ({
  question,
  isCorrect,
  isVerified,
  docLinks,
  isSearchingDocs,
  isFixing,
  isGeneratingSimilar,
  loadingSimilarError,
  currentIndex,
  totalQuestions,
  onNext,
  onVerify,
  onFix,
  onGenerateSimilar
}) => {
  return (
    <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="flex flex-col gap-4 mb-4">
        <div className={`flex items-center gap-3 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? <CheckCircle2 className="w-8 h-8"/> : <XCircle className="w-8 h-8"/>}
          <span className="text-2xl font-bold">{isCorrect ? '正解！' : '不正解...'}</span>
        </div>
        
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onFix}
            disabled={isFixing}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            title="問題に誤りがある場合に報告し、AIに修正させます"
          >
            {isFixing ? <Loader2 className="w-4 h-4 animate-spin"/> : <AlertTriangle className="w-4 h-4" />}
            <span className="text-sm font-medium">{isFixing ? '修正中...' : '不備/偽装 (Fake/Error)'}</span>
          </button>

          <button
            onClick={onVerify}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${isVerified ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-50'}`}
            title="解説とリンクを確認し、この問題を承認済みとしてマークします"
          >
            {isVerified ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
            <span className="text-sm font-medium">{isVerified ? '承認済み' : '承認する'}</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-xl border border-slate-200 mb-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          解説 & 根拠
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6">{question.explanation}</p>
        
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-sm font-semibold text-slate-500 mb-3">参考公式ドキュメント</h4>
          <div className="space-y-2">
            {question.urls && question.urls.map((url, idx) => (
              <a 
                key={`static-${idx}`} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors group"
              >
                <span className="text-sm font-medium text-indigo-900 truncate pr-4">
                  {url}
                </span>
                <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 flex-shrink-0" />
              </a>
            ))}

            {isSearchingDocs && (
              <div className="flex items-center gap-2 text-slate-500 text-sm py-2 px-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AIが追加のドキュメントを検索中...</span>
              </div>
            )}

            {!isSearchingDocs && docLinks.map((link, idx) => (
              <a 
                key={`ai-${idx}`} 
                href={link.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 truncate pr-4">
                    {link.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                </div>
                {link.summary && (
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {link.summary}
                  </p>
                )}
              </a>
            ))}

            {!isSearchingDocs && docLinks.length === 0 && (!question.urls || question.urls.length === 0) && (
              <p className="text-sm text-slate-400 italic">関連するドキュメントが見つかりませんでした。</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-end">
        {!isCorrect && (
          <button 
            onClick={onGenerateSimilar}
            disabled={isGeneratingSimilar}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium text-sm"
          >
            {isGeneratingSimilar ? <Sparkles className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
            類似問題を生成して追加
          </button>
        )}

        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all ml-auto"
        >
          {currentIndex < totalQuestions - 1 ? '次の問題へ' : '結果画面へ'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {loadingSimilarError && (
        <p className="text-right text-xs text-red-500 mt-2">{loadingSimilarError}</p>
      )}
    </div>
  );
};

export default ExplanationView;