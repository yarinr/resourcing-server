import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType, Int } from 'type-graphql';
import { Topic } from './topic/topic.entity';
import { Comment } from './comment/comment.entity';
import { Vote } from './vote/vote.entity';
import { User } from './user/user.entity';

export enum VoteType {
  Upvote = 'upvote',
  Downvote = 'downvote',
}
registerEnumType(VoteType, { name: 'VoteType' });

export enum ApprovalStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
}
registerEnumType(ApprovalStatus, { name: 'ApprovalStatus' });

export enum Category {
  PROGRAMMING = 'programming',
  DEVOPS = 'devops',
  DESIGN = 'design',
}
registerEnumType(Category, { name: 'Category' });
