export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatar: string;
  gradient: string;
  textColor: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedCharacter: Character | null;
}