// TODO: Use a more advanced file upload library to improve the validation and handling of file uploads.
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ChatPromptDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsArray()
  @IsOptional()
  files: Express.Multer.File[];

  @IsUUID()
  chatId: string;
}
