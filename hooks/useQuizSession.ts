import { useState, useEffect, useCallback } from 'react';
import { Question, UserStats } from '../types';
import { shuffleArray } from '../utils/common';
import { StorageService } from '../services/storageService';
import { APP_CONFIG } from '../config';

// Hook now accepts questions as an argument for better testing and flexibility (DIP)
export const useQuizSession = (initialQuestions: Question[]) => {
  // Initialize questions by merging with verified status from storage
  const [allQuestions, setAllQuestions] = useState<Question[]>(() => {
    const verifiedIds = StorageService.getVerifiedIds();
    return initialQuestions.map(q => ({
      ...q,
      // Priority: Storage > File default > false
      verified: verifiedIds.includes(q.id) || q.verified || false
    }));
  });

  const [sessionQueue, setSessionQueue] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({});
  
  // Timer states
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [accumulatedTime, setAccumulatedTime] = useState<number>(0);

  // Load stats
  useEffect(() => {
    setUserStats(StorageService.getStats());
  }, []);

  // Save stats
  useEffect(() => {
    StorageService.saveStats(userStats);
  }, [userStats]);

  const initSession = useCallback(() => {
    let weightedPool: Question[] = [];
    
    // Weighting logic for better learning
    allQuestions.forEach(q => {
      const stat = userStats[q.id];
      const weight = stat ? Math.max(1, 5 - Math.floor((stat.correct / stat.attempts) * 5)) : 3; 
      for(let i=0; i<weight; i++) {
        weightedPool.push(q);
      }
    });

    const shuffled = shuffleArray(weightedPool);
    const uniqueSession = Array.from(new Set(shuffled.map(q => q.id)))
      .map(id => allQuestions.find(q => q.id === id)!)
      .slice(0, APP_CONFIG.SESSION.QUESTIONS_PER_SESSION);

    const sessionWithRandomOptions = uniqueSession.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    setSessionQueue(sessionWithRandomOptions);
    setCurrentQIndex(0);
    setSelectedOptions([]);
    setIsAnswered(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setAccumulatedTime(0);
  }, [allQuestions, userStats]);

  // Initial load
  useEffect(() => {
    if (allQuestions.length > 0) {
        initSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Timer Effect
  useEffect(() => {
    let interval: number;
    if (!isAnswered && sessionQueue.length > 0) {
      interval = window.setInterval(() => {
        const currentSegment = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(accumulatedTime + currentSegment);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnswered, startTime, sessionQueue, accumulatedTime]);

  const handleOptionClick = (optionId: string, maxSelection: number) => {
    if (isAnswered) return;
    if (maxSelection === 1) {
      setSelectedOptions([optionId]);
    } else {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(prev => prev.filter(id => id !== optionId));
      } else {
        if (selectedOptions.length < maxSelection) {
          setSelectedOptions(prev => [...prev, optionId]);
        }
      }
    }
  };

  const submitAnswer = () => {
    if (selectedOptions.length === 0) return;

    const currentSegment = Math.floor((Date.now() - startTime) / 1000);
    const newTotalTime = accumulatedTime + currentSegment;
    setAccumulatedTime(newTotalTime);
    setElapsedTime(newTotalTime);

    const currentQ = sessionQueue[currentQIndex];
    const isCorrect = 
      selectedOptions.length === currentQ.correctOptionIds.length &&
      selectedOptions.every(id => currentQ.correctOptionIds.includes(id));

    setIsAnswered(true);

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
    } else {
      initSession();
    }
  };

  const updateQuestion = (updatedQ: Question) => {
    setAllQuestions(prev => prev.map(q => q.id === updatedQ.id ? updatedQ : q));
    setSessionQueue(prev => prev.map(q => q.id === updatedQ.id ? updatedQ : q));
  };

  const addQuestion = (newQ: Question) => {
    setAllQuestions(prev => [...prev, newQ]);
  };

  // Toggle verified status and sync with storage
  const toggleVerifyQuestion = (questionId: string) => {
    // Helper to sync with storage
    const syncStorage = (questions: Question[]) => {
        const ids = questions.filter(q => q.verified).map(q => q.id);
        StorageService.saveVerifiedIds(ids);
    };

    setAllQuestions(prev => {
        const updated = prev.map(q => q.id === questionId ? { ...q, verified: !q.verified } : q);
        syncStorage(updated);
        return updated;
    });

    setSessionQueue(prev => prev.map(q => q.id === questionId ? { ...q, verified: !q.verified } : q));
  };

  return {
    allQuestions,
    sessionQueue,
    currentQIndex,
    currentQuestion: sessionQueue[currentQIndex],
    selectedOptions,
    isAnswered,
    userStats,
    elapsedTime,
    handleOptionClick,
    submitAnswer,
    nextQuestion,
    updateQuestion,
    addQuestion,
    toggleVerifyQuestion,
  };
};