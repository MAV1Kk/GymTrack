import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  userId!: string;

  @IsString()
  type!: string;

  @IsInt()
  @Min(1)
  durationMin!: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
