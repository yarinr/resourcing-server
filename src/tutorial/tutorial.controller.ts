import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import {
  Tutorial,
  CreateTutorialDto,
  createVoteDto,
  CreateCommentDto,
} from '../entities';
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

  @Put('newTutorial')
  async addTutorial(
    @Body() createTutorialDto: CreateTutorialDto,
  ): Promise<Tutorial> {
    return this.tutorialService.addTutorial(createTutorialDto);
  }

  @Put('newComment')
  async addComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Tutorial> {
    return this.tutorialService.addComment(createCommentDto);
  }

  @Put(':id/upvote')
  async upvoteTutorial(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<Tutorial> {
    const voteDto: createVoteDto = {
      userId: userId,
      entity: 'Tutorial',
      entityId: id,
      type: 'Positive',
    };
    return this.tutorialService.vote(voteDto);
  }

  @Put(':id/downvote')
  async downvoteTutorial(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<Tutorial> {
    const voteDto: createVoteDto = {
      userId: userId,
      entity: 'Tutorial',
      entityId: id,
      type: 'Negative',
    };
    return this.tutorialService.vote(voteDto);
  }

  @Put(':id/:commentId/upvote')
  async upvoteComment(
    @Param('id') tutorialId: string,
    @Body() userId: string,
    @Body() commentId: string,
  ): Promise<Tutorial> {
    const voteDto: createVoteDto = {
      userId: userId,
      entity: 'Comment',
      entityId: commentId,
      tutorialId: tutorialId,
      type: 'Positive',
    };
    return this.tutorialService.vote(voteDto);
  }

  @Put(':id/downvote')
  async downvoteComment(
    @Param('id') tutorialId: string,
    @Body() userId: string,
    @Body() commentId: string,
  ): Promise<Tutorial> {
    const voteDto: createVoteDto = {
      userId: userId,
      entity: 'Tutorial',
      entityId: commentId,
      tutorialId: tutorialId,
      type: 'Negative',
    };
    return this.tutorialService.vote(voteDto);
  }
}
