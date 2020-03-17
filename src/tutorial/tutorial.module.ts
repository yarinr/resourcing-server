import { Module } from '@nestjs/common';
import { TutorialResolver } from './tutorial.resolver';
import { TutorialService } from './tutorial.service';

@Module({
  providers: [TutorialResolver, TutorialService]
})
export class TutorialModule {}
