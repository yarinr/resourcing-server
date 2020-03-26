// import {
//   Controller,
//   Get,
//   Param,
//   Post,
//   Body,
//   Put,
//   ValidationPipe,
//   UsePipes,
// } from '@nestjs/common';
// import { Tutorial, CreateTutorialDTO, CreateCommentDTO } from '../entities';
// import { TutorialService } from './tutorial.service';

// @Controller('tutorials')
// export class TutorialController {
//   constructor(private readonly tutorialService: TutorialService) {}

//   @Get()
//   async findAll(): Promise<Tutorial[]> {
//     return this.tutorialService.tutorials;
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<Tutorial> {
//     return this.tutorialService.getTutorial(id);
//   }

//   @Post('uploadTutorial')
//   @UsePipes(new ValidationPipe())
//   async addTutorial(
//     @Body('variables') data: { createTutorialDto: CreateTutorialDTO },
//   ): Promise<Tutorial> {
//     return await this.tutorialService.addTutorial(data.createTutorialDto);
//   }

//   @Put('newComment')
//   @UsePipes(new ValidationPipe())
//   async addComment(
//     @Body('variables') data: { createCommentDto: CreateCommentDTO },
//   ): Promise<Tutorial> {
//     return this.tutorialService.addComment(data.createCommentDto);
//   }

//   @Put(':id/upvote')
//   @UsePipes(new ValidationPipe())
//   async upvoteTutorial(
//     @Param('id') id: string,
//     @Body('variables') data: { userId: string },
//   ): Promise<Tutorial> {
//     return this.tutorialService.upvote(id, data.userId);
//   }

//   @Put(':id/downvote')
//   @UsePipes(new ValidationPipe())
//   async downvoteTutorial(
//     @Param('id') id: string,
//     @Body('variables') data: { userId: string },
//   ): Promise<Tutorial> {
//     return this.tutorialService.downvote(id, data.userId);
//   }
// }
