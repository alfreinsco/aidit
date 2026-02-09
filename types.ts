export type ChatMode = 'PRO' | 'LAB' | 'LITE';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  mode: ChatMode;
  messages: ChatMessage[];
}
