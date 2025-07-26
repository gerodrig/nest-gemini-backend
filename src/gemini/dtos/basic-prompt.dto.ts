// TODO: Use a more advanced file upload library to improve the validation and handling of file uploads.
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BasicPromptDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsArray()
  @IsOptional()
  files: Express.Multer.File[];
}
