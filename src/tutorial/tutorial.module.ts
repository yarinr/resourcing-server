import { Module } from '@nestjs/common';
import { TutorialResolver } from './tutorial.resolver';
import { TutorialService } from './tutorial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tutorial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TutorialResolver, TutorialService],
})
export class TutorialModule {}
