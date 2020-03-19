import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TutorialModule } from './tutorial/tutorial.module';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'sqlite',
  //     database: 'resourcing.db',
  //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //     synchronize: true,
  //   }),
  //   GraphQLModule.forRoot({
  //     autoSchemaFile: 'schema.gql',
  //     debug: true,
  //     playground: true,
  //   }),
  //   TutorialModule,
  // ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
