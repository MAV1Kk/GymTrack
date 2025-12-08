import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateWorkoutDto {
  @IsOptional()
  @IsIn(['ACTIVE', 'DONE'])
  status?: 'ACTIVE' | 'DONE';

  @IsOptional()
  @IsString()
  notes?: string;
}
