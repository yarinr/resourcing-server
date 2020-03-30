import { Module } from '@nestjs/common';
import { TopicService } from '../dal/topic/topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic/topic.entity';
import { Tutorial } from './tutorial/tutorial.entity';
import { Comment } from './comment/comment.entity';
import { User } from './user/user.entity';
import { Vote } from './vote/vote.entity';
import { TutorialService } from './tutorial/tutorial.service';
import { UserService } from './user/user.service';
import { TagService } from './tag/tag.service';
import { Tag } from './tag/tag.entity';
import { VoteService } from './vote/vote.service';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic, Tutorial, User, Comment, Vote, Tag]),
  ],
  providers: [
    TopicService,
    TutorialService,
    UserService,
    TagService,
    VoteService,
    CommentService,
  ],
  exports: [
    TopicService,
    TutorialService,
    UserService,
    TagService,
    VoteService,
    CommentService,
  ],
})
export class DalModule {}
