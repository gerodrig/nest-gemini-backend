import { GenerateContentResponse } from '@google/genai';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const outputStreamResponse = async (
  res: Response,
  stream: AsyncGenerator<GenerateContentResponse, any, any>,
) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(HttpStatus.OK);

  let resultText = '';
  try {
    for await (const chunk of stream) {
      const piece = chunk.text;
      resultText += piece;
      res.write(piece);
    }
  } catch (error) {
    console.error('Error during stream processing:', error);
    if (!res.headersSent) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error processing stream');
    }
  } finally {
    res.end();
  }
  return resultText;
};
