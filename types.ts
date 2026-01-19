export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionIds: string[]; // Supports multiple correct answers
  explanation: string;
  category: string;
  tags: string[];
  urls?: string[];
  verified?: boolean; // New property to track verification status
}

export interface UserStats {
  [questionId: string]: {
    attempts: number;
    correct: number;
    lastAnsweredAt: number;
    lastResult: 'correct' | 'incorrect';
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface DocReference {
  title: string;
  uri: string;
  summary?: string;
}

export type ImageSize = '1K' | '2K' | '4K';