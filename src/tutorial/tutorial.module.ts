import { Module } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorialResolver } from './tutorial.resolver';
import { Tutorial } from 'src/entities/tutorial/tutorial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutorial])],
  providers: [TutorialService, TutorialResolver],
  exports: [TutorialService],
})
export class TutorialModule {}
