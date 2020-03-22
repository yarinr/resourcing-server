import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TutorialController } from './tutorial.controller';
import { TutorialService } from './tutorial.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [TutorialController],
  providers: [TutorialService, UserService],
  exports: [TutorialService],
})
export class TutorialModule {}
