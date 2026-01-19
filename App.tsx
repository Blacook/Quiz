import React, { useState, useEffect } from 'react';
import { DocReference } from './types';
import { APP_CONFIG } from './config';
import { mockQuestions } from './data/questions';
import { Clock } from 'lucide-react';
import { formatTime } from './utils/common';

// Services & Hooks
import { generateSimilarQuestion, findOfficialDocumentation, fixQuestion } from './services/geminiService';
import { useQuizSession } from './hooks/useQuizSession';

// Components
import StatsDashboard from './components/StatsDashboard';
import FixDialog from './components/FixDialog';
import QuestionCard from './components/QuestionCard';

const App: React.FC = () => {
  // Use Custom Hook for Logic
  const {
    allQuestions,
    sessionQueue,
    currentQIndex,
    currentQuestion,
    selectedOptions,
    isAnswered,
    userStats,
    elapsedTime,
    handleOptionClick,
    submitAnswer,
    nextQuestion,
    updateQuestion,
    addQuestion,
    toggleVerifyQuestion
  } = useQuizSession(mockQuestions);

  // Local UI State
  const [isGeneratingSimilar, setIsGeneratingSimilar] = useState(false);
  const [loadingSimilarError, setLoadingSimilarError] = useState<string|null>(null);
  const [isFixing, setIsFixing] = useState(false);
  const [isFixDialogOpen, setIsFixDialogOpen] = useState(false);
  const [fixFeedback, setFixFeedback] = useState("");
  const [docLinks, setDocLinks] = useState<DocReference[]>([]);
  const [isSearchingDocs, setIsSearchingDocs] = useState(false);

  // Auto-search documentation
  useEffect(() => {
    if (isAnswered && currentQuestion) {
      const fetchDocs = async () => {
        setIsSearchingDocs(true);
        const docs = await findOfficialDocumentation(currentQuestion.text, currentQuestion.category, APP_CONFIG.CONTEXT);
        setDocLinks(docs);
        setIsSearchingDocs(false);
      };
      fetchDocs();
    } else {
      setDocLinks([]);
      setIsSearchingDocs(false);
    }
  }, [isAnswered, currentQuestion]);

  // Handlers
  const handleGenerateSimilar = async () => {
    if (!currentQuestion) return;
    setIsGeneratingSimilar(true);
    setLoadingSimilarError(null);
    try {
      const newQ = await generateSimilarQuestion(currentQuestion);
      if (newQ) {
        addQuestion(newQ);
        alert("類似問題を追加しました！次回のセッションから出題される可能性があります。");
      } else {
        setLoadingSimilarError("問題の生成に失敗しました。");
      }
    } catch (e) {
        setLoadingSimilarError("エラーが発生しました。");
    } finally {
      setIsGeneratingSimilar(false);
    }
  };

  const toggleVerify = () => {
      if (!currentQuestion) return;
      toggleVerifyQuestion(currentQuestion.id);
  };

  const openFixDialog = () => {
    setFixFeedback("");
    setIsFixDialogOpen(true);
  };

  const handleExecuteFix = async () => {
      if (!currentQuestion) return;
      setIsFixDialogOpen(false);
      setIsFixing(true);
      try {
          const fixedQ = await fixQuestion(currentQuestion, APP_CONFIG.CONTEXT, fixFeedback);
          if (fixedQ) {
              // Preserve verified status if needed, or reset it. Currently resetting as content changed.
              updateQuestion(fixedQ);
              // If previously verified, we might want to un-verify because content changed
              if (currentQuestion.verified) {
                  toggleVerifyQuestion(fixedQ.id); // Toggle off if it was on
              }
              alert("問題を修正しました。内容が更新されました。");
          } else {
              alert("修正案の生成に失敗しました。");
          }
      } catch (e) {
          alert("エラーが発生しました。");
      } finally {
          setIsFixing(false);
      }
  };

  if (sessionQueue.length === 0) {
     return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    {APP_CONFIG.NAME}
                </h1>
                <span className="text-xs text-slate-400 font-medium tracking-wide">Cert: {APP_CONFIG.CONTEXT}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-mono bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedTime)}</span>
            </div>
        </div>

        <StatsDashboard stats={userStats} totalQuestionsInPool={allQuestions.length} />

        <QuestionCard 
          question={currentQuestion}
          currentIndex={currentQIndex}
          totalQuestions={sessionQueue.length}
          selectedOptions={selectedOptions}
          isAnswered={isAnswered}
          isVerified={!!currentQuestion.verified}
          docLinks={docLinks}
          isSearchingDocs={isSearchingDocs}
          isFixing={isFixing}
          isGeneratingSimilar={isGeneratingSimilar}
          loadingSimilarError={loadingSimilarError}
          onOptionClick={handleOptionClick}
          onSubmit={submitAnswer}
          onNext={nextQuestion}
          onVerify={toggleVerify}
          onFix={openFixDialog}
          onGenerateSimilar={handleGenerateSimilar}
        />
      </div>
      
      <FixDialog 
        isOpen={isFixDialogOpen}
        feedback={fixFeedback}
        onFeedbackChange={setFixFeedback}
        onClose={() => setIsFixDialogOpen(false)}
        onSubmit={handleExecuteFix}
      />
    </div>
  );
};

export default App;