import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { Topic, CreateTopicDTO } from '../entities';
import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async findAll(): Promise<Topic[]> {
    return this.topicService.topics;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicService.getTopic(id);
  }

  @Post('newTopic')
  @UsePipes(new ValidationPipe())
  async addTopic(
    @Body('variables') data: { createTopicDto: CreateTopicDTO },
  ): Promise<Topic> {
    return await this.topicService.addTopic(data.createTopicDto);
  }
}
