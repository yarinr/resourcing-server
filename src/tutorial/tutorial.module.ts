import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TutorialController } from './tutorial.controller';
import { TutorialService } from './tutorial.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [TutorialController],
  providers: [TutorialService],
})
export class TutorialModule {}
