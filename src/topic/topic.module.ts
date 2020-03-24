import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/all-entities.entity';
import { TopicResolver } from './topic.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicService, TopicResolver],
  exports: [TopicService],
})
export class TopicModule {}