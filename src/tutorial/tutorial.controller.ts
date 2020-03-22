import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { Tutorial, CreateTutorialDTO, CreateCommentDTO } from '../entities';
import { TutorialService } from './tutorial.service';

@Controller('tutorials')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Get()
  async findAll(): Promise<Tutorial[]> {
    return this.tutorialService.tutorials;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tutorial> {
    return this.tutorialService.getTutorial(id);
  }

  @Put('uploadTutorial')
  async addTutorial(
    @Body() createTutorialDto: CreateTutorialDTO,
  ): Promise<Tutorial> {
    return this.tutorialService.addTutorial(createTutorialDto);
  }

  @Put('newComment')
  async addComment(
    @Body() createCommentDto: CreateCommentDTO,
  ): Promise<Tutorial> {
    return this.tutorialService.addComment(createCommentDto);
  }

  @Put(':id/upvote')
  async upvoteTutorial(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<Tutorial> {
    return this.tutorialService.upvote(id, userId);
  }

  @Put(':id/downvote')
  async downvoteTutorial(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<Tutorial> {
    return this.tutorialService.downvote(id, userId);
  }
}
