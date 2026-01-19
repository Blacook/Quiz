export const APP_CONFIG = {
  NAME: "Smart Quiz AI",
  CONTEXT: "SnowPro Core Certification", // Application-wide context for AI

  // Local Storage Keys
  STORAGE_KEYS: {
    STATS: 'quizStats',
    VERIFIED: 'verifiedQuestions',
  },

  // Gemini Model Configurations
  MODELS: {
    GENERATION: 'gemini-3-pro-preview',
    SEARCH: 'gemini-3-flash-preview',
  },

  // Session Settings
  SESSION: {
    QUESTIONS_PER_SESSION: 10,
  }
} as const;