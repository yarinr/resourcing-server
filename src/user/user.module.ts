import { Module } from '@nestjs/common';
import { DalModule } from 'src/dal/dal.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DalModule],
  providers: [UserResolver],
  exports: [],
})
export class UserModule {}
