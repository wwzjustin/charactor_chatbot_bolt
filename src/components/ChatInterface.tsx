import { useEffect, useRef } from 'react';
import { Character, Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatInterfaceProps {
  character: Character;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onBack: () => void;
  onClearChat: () => void;
}

export function ChatInterface({ 
  character, 
  messages, 
  isLoading, 
  onSendMessage, 
  onBack,
  onClearChat 
}: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="hover:bg-white/50 dark:hover:bg-slate-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${character.gradient} flex items-center justify-center text-sm`}>
              {character.avatar}
            </div>
            <div>
              <h2 className={`font-semibold ${character.textColor}`}>
                {character.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {character.description}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearChat}
            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${character.gradient} flex items-center justify-center text-2xl mx-auto mb-4`}>
                {character.avatar}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Start a conversation with {character.name}
              </h3>
              <p className="text-muted-foreground">
                Send a message to begin chatting!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                character={character} 
              />
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 p-4 bg-white dark:bg-slate-800/50 rounded-lg">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${character.gradient} flex items-center justify-center text-lg`}>
                {character.avatar}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${character.textColor} mb-1`}>
                  {character.name}
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput 
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        character={character}
      />
    </div>
  );
}