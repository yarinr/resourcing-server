import { Module } from '@nestjs/common';
import { TagResolver } from './tag.resolver';
import { DalModule } from 'src/dal/dal.module';

@Module({
  imports: [DalModule],
  providers: [TagResolver],
  exports: [],
})
export class TagModule {}
