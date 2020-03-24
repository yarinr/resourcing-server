import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TutorialService } from './tutorial.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tutorial.entity';
import { TutorialResolver } from './tutorial.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), UserModule],
  // controllers: [TutorialController],
  providers: [TutorialService, UserService, TutorialResolver],
  exports: [TutorialService],
})
export class TutorialModule {}
