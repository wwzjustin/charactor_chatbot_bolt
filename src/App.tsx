import { useState } from 'react';
import { CharacterSelection } from './components/CharacterSelection';
import { ChatInterface } from './components/ChatInterface';
import { Character, Message, ChatState } from './types/chat';
import { getChatCompletion } from './lib/openai';
import './App.css';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    selectedCharacter: null,
  });

  const handleSelectCharacter = (character: Character) => {
    setChatState(prev => ({
      ...prev,
      selectedCharacter: character,
      messages: []
    }));
  };

  const handleSendMessage = async (content: string) => {
    if (!chatState.selectedCharacter) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const chatHistory = chatState.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const aiResponse = await getChatCompletion(
        [...chatHistory, { role: 'user', content }],
        chatState.selectedCharacter.systemPrompt
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please make sure your OpenAI API key is configured correctly in the .env file.',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }
  };

  const handleBack = () => {
    setChatState(prev => ({
      ...prev,
      selectedCharacter: null,
      messages: [],
    }));
  };

  const handleClearChat = () => {
    setChatState(prev => ({
      ...prev,
      messages: [],
    }));
  };

  if (!chatState.selectedCharacter) {
    return <CharacterSelection onSelectCharacter={handleSelectCharacter} />;
  }

  return (
    <ChatInterface
      character={chatState.selectedCharacter}
      messages={chatState.messages}
      isLoading={chatState.isLoading}
      onSendMessage={handleSendMessage}
      onBack={handleBack}
      onClearChat={handleClearChat}
    />
  );
}

export default App;