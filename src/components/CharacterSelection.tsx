import { Character } from '@/types/chat';
import { characters } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

interface CharacterSelectionProps {
  onSelectCharacter: (character: Character) => void;
}

export function CharacterSelection({ onSelectCharacter }: CharacterSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Conversation Partner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a character to chat with. Each has their own unique personality and speaking style.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Card 
              key={character.id} 
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/20"
              onClick={() => onSelectCharacter(character)}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-r ${character.gradient} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {character.avatar}
                </div>
                <CardTitle className={`text-2xl ${character.textColor} group-hover:text-primary transition-colors`}>
                  {character.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {character.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full bg-gradient-to-r ${character.gradient} hover:opacity-90 text-white border-0 transition-all duration-300 group-hover:shadow-lg`}
                >
                  Start Chatting
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Powered by OpenAI • Make sure to add your API key to the .env file</p>
        </div>
      </div>
    </div>
  );
}