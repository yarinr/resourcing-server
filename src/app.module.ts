import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorialModule } from './tutorial/tutorial.module';
import { TopicModule } from './topic/topic.module';
import { DalModule } from './dal/dal.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { VoteModule } from './vote/vote.module';
import { CommentModule } from './comment/comment.module';

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
      context: ({ req, res }) => ({ req, res }),
    }),
    DalModule,
    TopicModule,
    TutorialModule,
    UserModule,
    TagModule,
    VoteModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
