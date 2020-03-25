import { Module } from '@nestjs/common';
import { TopicService } from '../dal/topic/topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicService],
  exports: [TopicService],
})
export class DalModule {}
