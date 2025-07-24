
export interface WebsitePrompt {
  prompt: string;
  settings?: {
    complexity?: 'simple' | 'medium' | 'complex';
    style?: 'minimal' | 'modern' | 'playful';
  };
}

export interface AIResponse {
  html: string;
  css?: string;
  js?: string;
  error?: string;
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }[];
  created: number;
  model: string;
  object: string;
}
