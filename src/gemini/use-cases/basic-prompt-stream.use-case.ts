import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from '@google/genai';
import { BasicPromptDto } from '../dtos/basic-prompt.dto';
import { geminiUploadFiles } from '../helpers/gemini-upload-file.helper';

// TODO: Make the model name and system instructions configurable.
interface Options {
  model?: string;
  systemInstruction?: string;
}

export const basicPromptStreamUseCase = async (
  ai: GoogleGenAI,
  basicPromptDto: BasicPromptDto,
  options?: Options,
) => {
  const { prompt, files = [] } = basicPromptDto;
  const images = await geminiUploadFiles(ai, files);

  const {
    model = 'gemini-2.0-flash',
    systemInstruction = `
        Reply only in english,
        in MD format where bold test is wrapped in __,
        Use International system of units (SI) for all measurements,
        `,
  } = options ?? {};

  const response = await ai.models.generateContentStream({
    model: model,
    // contents: basicPromptDto.prompt,
    contents: [
      createUserContent([
        prompt,
        ...images.map((image) =>
          createPartFromUri(image.uri!, image.mimeType!),
        ),
      ]),
    ],
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return response;
};
