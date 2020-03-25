import { Module } from '@nestjs/common';
import { TutorialResolver } from './tutorial.resolver';
import { DalModule } from 'src/dal/dal.module';

@Module({
  imports: [DalModule],
  providers: [TutorialResolver],
  exports: [],
})
export class TutorialModule {}
