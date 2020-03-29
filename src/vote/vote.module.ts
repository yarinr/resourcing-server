import { Module } from '@nestjs/common';
import { DalModule } from 'src/dal/dal.module';
import { VoteResolver } from './vote.resolver';

@Module({
  imports: [DalModule],
  providers: [VoteResolver],
  exports: [],
})
export class VoteModule {}
