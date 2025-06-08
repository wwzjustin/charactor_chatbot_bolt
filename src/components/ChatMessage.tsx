import { Message, Character } from '@/types/chat';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  character: Character;
}

export function ChatMessage({ message, character }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg transition-all duration-300",
      isUser ? "flex-row-reverse bg-blue-50 dark:bg-blue-950/20" : "bg-white dark:bg-slate-800/50"
    )}>
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium",
        isUser 
          ? "bg-blue-500 text-white" 
          : `bg-gradient-to-r ${character.gradient} text-white`
      )}>
        {isUser ? <User className="w-5 h-5" /> : character.avatar}
      </div>
      
      <div className={cn(
        "flex-1 space-y-1",
        isUser ? "text-right" : "text-left"
      )}>
        <div className={cn(
          "text-sm font-medium",
          isUser ? "text-blue-600" : character.textColor
        )}>
          {isUser ? "You" : character.name}
        </div>
        <div className={cn(
          "text-sm text-foreground leading-relaxed",
          isUser ? "text-right" : "text-left"
        )}>
          {message.content}
        </div>
        <div className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}