import { Module } from '@nestjs/common';
import { DalModule } from 'src/dal/dal.module';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [DalModule],
  providers: [CommentResolver],
  exports: [],
})
export class CommentModule {}
