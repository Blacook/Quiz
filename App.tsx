import React, { useState, useEffect, useCallback } from 'react';
import { mockQuestions } from './data/questions';
import { Question, UserStats, DocReference } from './types';
import StatsDashboard from './components/StatsDashboard';
import ChatBot from './components/ChatBot';
import { generateSimilarQuestion, findOfficialDocumentation, fixQuestion } from './services/geminiService';
import { Clock, CheckCircle2, XCircle, ChevronRight, RotateCcw, Sparkles, BookOpen, ExternalLink, Loader2, ShieldCheck, Shield, AlertTriangle, Send, X } from 'lucide-react';

const APP_CONTEXT = "SnowPro Core";

const App: React.FC = () => {
  // State
  const [allQuestions, setAllQuestions] = useState<Question[]>(mockQuestions);
  const [sessionQueue, setSessionQueue] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({});
  const [verifiedIds, setVerifiedIds] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [accumulatedTime, setAccumulatedTime] = useState<number>(0); // Total time spent on previous questions
  const [isGeneratingSimilar, setIsGeneratingSimilar] = useState(false);
  const [loadingSimilarError, setLoadingSimilarError] = useState<string|null>(null);
  const [isFixing, setIsFixing] = useState(false);
  
  // Fix Dialog State
  const [isFixDialogOpen, setIsFixDialogOpen] = useState(false);
  const [fixFeedback, setFixFeedback] = useState("");

  // Documentation Links State
  const [docLinks, setDocLinks] = useState<DocReference[]>([]);
  const [isSearchingDocs, setIsSearchingDocs] = useState(false);

  // Load stats from local storage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('quizStats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
    const savedVerified = localStorage.getItem('verifiedQuestions');
    if (savedVerified) {
        setVerifiedIds(JSON.parse(savedVerified));
    }
  }, []);

  // Save stats to local storage
  useEffect(() => {
    localStorage.setItem('quizStats', JSON.stringify(userStats));
  }, [userStats]);

  // Save verified status
  useEffect(() => {
      localStorage.setItem('verifiedQuestions', JSON.stringify(verifiedIds));
  }, [verifiedIds]);

  // Fisher-Yates shuffle
  const shuffle = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Initialize Session
  const initSession = useCallback(() => {
    // Weighted random selection: Give more weight to questions with low accuracy
    let weightedPool: Question[] = [];
    
    allQuestions.forEach(q => {
      const stat = userStats[q.id];
      const weight = stat ? Math.max(1, 5 - Math.floor((stat.correct / stat.attempts) * 5)) : 3; 
      // Add copies based on weight
      for(let i=0; i<weight; i++) {
        weightedPool.push(q);
      }
    });

    // Shuffle and pick unique questions for the session (e.g., 5 questions)
    const shuffled = shuffle(weightedPool);
    const uniqueSession = Array.from(new Set(shuffled.map(q => q.id)))
      .map(id => allQuestions.find(q => q.id === id)!)
      .slice(0, 5); // Session size of 5

    // Randomize options for each question
    const sessionWithRandomOptions = uniqueSession.map(q => ({
      ...q,
      options: shuffle(q.options)
    }));

    setSessionQueue(sessionWithRandomOptions);
    setCurrentQIndex(0);
    setSelectedOptions([]);
    setIsAnswered(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setAccumulatedTime(0);
    setDocLinks([]);
  }, [allQuestions, userStats]);

  // Initial load
  useEffect(() => {
    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once

  // Timer
  useEffect(() => {
    let interval: number;
    if (!isAnswered && sessionQueue.length > 0) {
      interval = window.setInterval(() => {
        // Elapsed time = Time from previous questions + Time on current question
        const currentSegment = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(accumulatedTime + currentSegment);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnswered, startTime, sessionQueue, accumulatedTime]);


  // Auto-search documentation when question is answered
  useEffect(() => {
    if (isAnswered && sessionQueue.length > 0) {
      const fetchDocs = async () => {
        setIsSearchingDocs(true);
        const currentQ = sessionQueue[currentQIndex];
        const docs = await findOfficialDocumentation(currentQ.text, currentQ.category, APP_CONTEXT);
        setDocLinks(docs);
        setIsSearchingDocs(false);
      };
      fetchDocs();
    } else {
      setDocLinks([]);
      setIsSearchingDocs(false);
    }
  }, [isAnswered, currentQIndex, sessionQueue]);


  const handleOptionClick = (optionId: string, maxSelection: number) => {
    if (isAnswered) return;

    if (maxSelection === 1) {
      setSelectedOptions([optionId]);
    } else {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      } else {
        if (selectedOptions.length < maxSelection) {
          setSelectedOptions([...selectedOptions, optionId]);
        }
      }
    }
  };

  const submitAnswer = () => {
    if (selectedOptions.length === 0) return;

    // Calculate time spent on this question and add to accumulated time
    const currentSegment = Math.floor((Date.now() - startTime) / 1000);
    const newTotalTime = accumulatedTime + currentSegment;
    setAccumulatedTime(newTotalTime);
    setElapsedTime(newTotalTime);

    const currentQ = sessionQueue[currentQIndex];
    const isCorrect = 
      selectedOptions.length === currentQ.correctOptionIds.length &&
      selectedOptions.every(id => currentQ.correctOptionIds.includes(id));

    setIsAnswered(true);

    // Update Stats
    setUserStats(prev => {
      const currentStat = prev[currentQ.id] || { attempts: 0, correct: 0, lastAnsweredAt: 0, lastResult: 'incorrect' };
      return {
        ...prev,
        [currentQ.id]: {
          attempts: currentStat.attempts + 1,
          correct: currentStat.correct + (isCorrect ? 1 : 0),
          lastAnsweredAt: Date.now(),
          lastResult: isCorrect ? 'correct' : 'incorrect'
        }
      };
    });
  };

  const nextQuestion = () => {
    if (currentQIndex < sessionQueue.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOptions([]);
      setIsAnswered(false);
      setStartTime(Date.now());
      // Do not reset elapsedTime here; it will resume from accumulatedTime
      setLoadingSimilarError(null);
      setDocLinks([]);
    } else {
      // End of session, re-init
      initSession();
    }
  };

  const handleGenerateSimilar = async () => {
    const currentQ = sessionQueue[currentQIndex];
    setIsGeneratingSimilar(true);
    setLoadingSimilarError(null);
    try {
      const newQ = await generateSimilarQuestion(currentQ);
      if (newQ) {
        setAllQuestions(prev => [...prev, newQ]);
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
      const currentQ = sessionQueue[currentQIndex];
      setVerifiedIds(prev => {
          if (prev.includes(currentQ.id)) {
              return prev.filter(id => id !== currentQ.id);
          } else {
              return [...prev, currentQ.id];
          }
      });
  };

  const openFixDialog = () => {
    setFixFeedback("");
    setIsFixDialogOpen(true);
  };

  const handleExecuteFix = async () => {
      setIsFixDialogOpen(false);
      const currentQ = sessionQueue[currentQIndex];
      
      setIsFixing(true);
      try {
          const fixedQ = await fixQuestion(currentQ, APP_CONTEXT, fixFeedback);
          if (fixedQ) {
              // Preserve ID to maintain stats continuity, or use new content
              // Update all collections
              setAllQuestions(prev => prev.map(q => q.id === fixedQ.id ? fixedQ : q));
              setSessionQueue(prev => prev.map(q => q.id === fixedQ.id ? fixedQ : q));
              
              // Un-verify if it was verified
              if (verifiedIds.includes(fixedQ.id)) {
                  setVerifiedIds(prev => prev.filter(id => id !== fixedQ.id));
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

  const currentQ = sessionQueue[currentQIndex];
  const isMultiple = currentQ.correctOptionIds.length > 1;
  const isCorrect = isAnswered && 
    selectedOptions.length === currentQ.correctOptionIds.length &&
    selectedOptions.every(id => currentQ.correctOptionIds.includes(id));
  const isVerified = verifiedIds.includes(currentQ.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Header / Stats */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Smart Quiz AI
                </h1>
                <span className="text-xs text-slate-400 font-medium tracking-wide">Context: {APP_CONTEXT}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-mono bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
            </div>
        </div>

        <StatsDashboard stats={userStats} totalQuestionsInPool={allQuestions.length} />

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden relative">
          
          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 w-full">
            <div 
                className="h-full bg-blue-500 transition-all duration-300" 
                style={{ width: `${((currentQIndex + 1) / sessionQueue.length) * 100}%` }}
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wide uppercase">
                        Question {currentQIndex + 1} / {sessionQueue.length}
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
              {currentQ.text}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option) => {
                const isSelected = selectedOptions.includes(option.id);
                const isCorrectOption = currentQ.correctOptionIds.includes(option.id);
                
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
                    onClick={() => handleOptionClick(option.id, isMultiple ? 2 : 1)}
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

            {/* Actions */}
            <div className="mt-8 flex justify-end">
              {!isAnswered ? (
                <button
                  onClick={submitAnswer}
                  disabled={selectedOptions.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  回答する
                </button>
              ) : null}
            </div>
          </div>

          {/* Explanation Section */}
          {isAnswered && (
            <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500">
               <div className="flex flex-col gap-4 mb-4">
                   <div className={`flex items-center gap-3 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                        {isCorrect ? <CheckCircle2 className="w-8 h-8"/> : <XCircle className="w-8 h-8"/>}
                        <span className="text-2xl font-bold">{isCorrect ? '正解！' : '不正解...'}</span>
                   </div>
                   
                   <div className="flex items-center justify-end gap-2">
                        <button
                                onClick={openFixDialog}
                                disabled={isFixing}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                                title="問題に誤りがある場合に報告し、AIに修正させます"
                        >
                            {isFixing ? <Loader2 className="w-4 h-4 animate-spin"/> : <AlertTriangle className="w-4 h-4" />}
                            <span className="text-sm font-medium">{isFixing ? '修正中...' : '不備/偽装 (Fake/Error)'}</span>
                        </button>

                        <button
                                onClick={toggleVerify}
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
                   <p className="text-slate-600 leading-relaxed mb-6">{currentQ.explanation}</p>
                   
                   <div className="border-t border-slate-100 pt-4">
                       <h4 className="text-sm font-semibold text-slate-500 mb-3">参考公式ドキュメント</h4>
                       <div className="space-y-2">
                           {/* Static URLs from data */}
                           {currentQ.urls && currentQ.urls.map((url, idx) => (
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

                           {/* AI Searching State */}
                           {isSearchingDocs && (
                               <div className="flex items-center gap-2 text-slate-500 text-sm py-2 px-1">
                                   <Loader2 className="w-4 h-4 animate-spin" />
                                   <span>AIが追加のドキュメントを検索中...</span>
                               </div>
                           )}

                           {/* AI Found Links */}
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

                           {/* Empty State */}
                           {!isSearchingDocs && docLinks.length === 0 && (!currentQ.urls || currentQ.urls.length === 0) && (
                                <p className="text-sm text-slate-400 italic">関連するドキュメントが見つかりませんでした。</p>
                           )}
                       </div>
                   </div>
               </div>

               <div className="flex flex-wrap gap-3 justify-end">
                  {!isCorrect && (
                      <button 
                        onClick={handleGenerateSimilar}
                        disabled={isGeneratingSimilar}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium text-sm"
                      >
                         {isGeneratingSimilar ? <Sparkles className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
                         類似問題を生成して追加
                      </button>
                  )}

                   <button
                    onClick={nextQuestion}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all ml-auto"
                   >
                     {currentQIndex < sessionQueue.length - 1 ? '次の問題へ' : '結果画面へ'}
                     <ChevronRight className="w-5 h-5" />
                   </button>
               </div>
               {loadingSimilarError && (
                   <p className="text-right text-xs text-red-500 mt-2">{loadingSimilarError}</p>
               )}
            </div>
          )}
        </div>
      </div>

      <ChatBot currentContext={isAnswered ? `現在の問題: ${currentQ.text}\n正解: ${currentQ.explanation}` : `現在の問題: ${currentQ.text}`} />
      
      {/* Fix Dialog Modal */}
      {isFixDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 bg-red-50 border-b border-red-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold">問題の不備を報告</h3>
              </div>
              <button onClick={() => setIsFixDialogOpen(false)} className="text-red-400 hover:text-red-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                問題文、選択肢、または解説に誤りがある場合は、詳細を入力してください。AIが指摘内容を考慮して修正案を生成します。
              </p>
              <textarea
                value={fixFeedback}
                onChange={(e) => setFixFeedback(e.target.value)}
                placeholder="例: 正解はBではなくCです。なぜなら..."
                className="w-full h-32 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400 focus:outline-none resize-none text-sm"
                autoFocus
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsFixDialogOpen(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-sm"
              >
                キャンセル
              </button>
              <button
                onClick={handleExecuteFix}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm shadow-sm flex items-center gap-2"
              >
                <Send className="w-3 h-3" />
                報告して修正
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;