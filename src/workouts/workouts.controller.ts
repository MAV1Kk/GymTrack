import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto.js';
import { UpdateWorkoutDto } from './dto/update-workout.dto.js';
import { WorkoutsService } from './workouts.service.js';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workouts: WorkoutsService) {}

  @Post()
  create(@Body() dto: CreateWorkoutDto) {
    return this.workouts.create(dto);
  }

  @Get()
  list(@Query('userId') userId: string) {
    return this.workouts.listByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutDto) {
    return this.workouts.update(id, dto);
  }
}
