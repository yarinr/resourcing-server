import { Module } from '@nestjs/common';
import { TopicResolver } from './topic.resolver';
import { DalModule } from 'src/dal/dal.module';

@Module({
  imports: [DalModule],
  providers: [TopicResolver],
  exports: [],
})
export class TopicModule {}
