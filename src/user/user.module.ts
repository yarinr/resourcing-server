import { Module } from '@nestjs/common';
import { DalModule } from 'src/dal/dal.module';

@Module({
  imports: [DalModule],
  providers: [],
  exports: [],
})
export class UserModule {}
