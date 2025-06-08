import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file.');
}

export const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export async function getChatCompletion(messages: Array<{role: string, content: string}>, systemPrompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 150,
      temperature: 0.9,
    });

    return response.choices[0]?.message?.content || 'I apologize, but I cannot generate a response right now.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get AI response. Please check your API key and try again.');
  }
}