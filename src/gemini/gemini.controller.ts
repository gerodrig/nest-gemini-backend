import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { Response } from 'express';
import { ChatPromptDto } from './dtos/chat.prompt.dto';
import { ImageGenerationDto } from './dtos/image-generation.dto';
import { outputStreamResponse } from './helpers/response-stream.helper';
import { PokemonHelperDto } from './dtos/pokemon-helper.dto';
import { TriviaQuestionDto } from './dtos/trivia-question.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('basic-prompt')
  basicPrompt(@Body() basicPromptDto: BasicPromptDto) {
    console.log('Basic Prompt:', basicPromptDto);
    return this.geminiService.basicPrompt(basicPromptDto);
  }
  @Post('basic-prompt-stream')
  @UseInterceptors(FilesInterceptor('files'))
  async basicPromptStream(
    @Body() basicPromptDto: BasicPromptDto,
    @Res() res: Response,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    basicPromptDto.files = files;

    const stream = await this.geminiService.basicPromptStream(basicPromptDto);

    void outputStreamResponse(res, stream);
  }

  private saveChatMessages(chatId: string, prompt: string, response: string) {
    const userMessage = {
      role: 'user',
      parts: [{ text: prompt }],
    };

    const modelMessage = {
      role: 'model',
      parts: [{ text: response }],
    };

    this.geminiService.saveMessage(chatId, userMessage);
    this.geminiService.saveMessage(chatId, modelMessage);
  }

  @Post('chat-stream')
  @UseInterceptors(FilesInterceptor('files'))
  async chatStream(
    @Body() chatPromptDto: ChatPromptDto,
    @Res() res: Response,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    chatPromptDto.files = files;

    const stream = await this.geminiService.chatSream(chatPromptDto);
    const data = await outputStreamResponse(res, stream);

    this.saveChatMessages(chatPromptDto.chatId, chatPromptDto.prompt, data);
  }

  // TODO: Implement pagination for chat history.
  @Get('chat-history/:chatId')
  getChatHistory(@Param('chatId') chatId: string) {
    return this.geminiService.getChatHistory(chatId).map((message) => ({
      role: message.role,
      parts: message.parts?.map((part) => part.text).join('') || '',
    }));
  }

  @Post('image-generation')
  @UseInterceptors(FilesInterceptor('files'))
  async imageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    imageGenerationDto.files = files;

    const { imageUrl, text } =
      await this.geminiService.imageGeneration(imageGenerationDto);

    return {
      imageUrl,
      text,
    };
  }

  @Post('pokemon-helper')
  getPokemonHelp(@Body() pokemonHelperDto: PokemonHelperDto) {
    return this.geminiService.getPokemonHelp(pokemonHelperDto);
  }

  @Get('trivia-question/:topic')
  getTriviaQuestion(@Param() triviaQuestionDto: TriviaQuestionDto) {
    return this.geminiService.getTriviaQuestion(triviaQuestionDto);
  }
}
