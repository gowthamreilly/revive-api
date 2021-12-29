import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  album: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  duration_ms: number;

  @IsObject()
  @IsOptional()
  external_urls?: {
    [key: string]: string;
  };

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}
