import { GoogleGenAI } from '@google/genai';
import { TriviaQuestionDto } from '../dtos/trivia-question.dto';

export interface TriviaResponse {
  question: string;
  answers: string[];
  correct: number;
}

export const getTriviaQuestionUseCase = async (
  ai: GoogleGenAI,
  triviaQuestionDto: TriviaQuestionDto,
) => {
  const { topic } = triviaQuestionDto;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `Provide a general question related to ${topic}`,
    config: {
      responseMimeType: 'application/json',
      systemInstruction: `You are a trivia generator. You will be asked general knowledge questions and must generate 3 incorrect answers and 1 correct answer.
      The index of the correct answer should vary in position. Occasionally, generate a super difficult question.
      
      {
        question: "this is where the general question goes",
        answers: [
          "answer 1",
          "answer 2",
          "answer 3",
          "answer 4"
        ],
        correct: index of the correct answer in the array
      }
      
      Only return the JSON object, do not provide explanations or anything else.`,
    },
  });

  // return response.text;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonResponse = JSON.parse(response.text ?? '{}');
  return jsonResponse as TriviaResponse;
};
