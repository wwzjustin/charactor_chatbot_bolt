import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';
import { Character } from '@/types/chat';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  character: Character;
}

export function ChatInput({ onSendMessage, isLoading, character }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const placeholders = {
    trump: "Ask me about making America great...",
    seth: "How can I help optimize your wellness today?",
    yoda: "Questions you have, hmm?"
  };

  return (
    <div className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholders[character.id as keyof typeof placeholders] || "Type your message..."}
          disabled={isLoading}
          className="flex-1 bg-white dark:bg-slate-800 border-2 focus:border-primary/50 transition-colors"
        />
        <Button 
          type="submit" 
          disabled={!message.trim() || isLoading}
          className={`bg-gradient-to-r ${character.gradient} hover:opacity-90 text-white px-6 transition-all duration-300`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}