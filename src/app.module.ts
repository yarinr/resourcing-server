import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorialModule } from './tutorial/tutorial.module';
import { TopicModule } from './topic/topic.module';
import { DalModule } from './dal/dal.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'resourcing.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
    DalModule,
    TopicModule,
    TutorialModule,
    //UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
