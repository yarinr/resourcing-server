import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TutorialService } from './tutorial.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutorial } from '../all-entities.entity';
import { TutorialResolver } from './tutorial.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tutorial]), UserModule],
  providers: [TutorialService, UserService, TutorialResolver],
  exports: [TutorialService],
})
export class TutorialModule {}
