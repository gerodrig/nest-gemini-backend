import { Content, createPartFromUri, GoogleGenAI } from '@google/genai';
import { ChatPromptDto } from '../dtos/chat.prompt.dto';
import { geminiUploadFiles } from '../helpers/gemini-upload-file';

interface Options {
  model?: string;
  systemInstructions?: string;
  history: Content[];
}

export const chatPromptStreamUseCase = async (
  ai: GoogleGenAI,
  chatPromptDto: ChatPromptDto,
  options?: Options,
) => {
  const { prompt, files = [] } = chatPromptDto;
  const uploadedFiles = await geminiUploadFiles(ai, files);

  const {
    model = 'gemini-2.0-flash',
    history = [],
    systemInstructions = `
            Reply only in english,
            in MD format where bold text is wrapped in __,
            Use International system of units (SI) for all measurements,
        `,
  } = options ?? {};

  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstructions,
    },
    history: history,
  });

  return chat.sendMessageStream({
    message: [
      prompt,
      ...uploadedFiles.map((file) =>
        createPartFromUri(file.uri ?? '', file.mimeType ?? ''),
      ),
    ],
  });
};
