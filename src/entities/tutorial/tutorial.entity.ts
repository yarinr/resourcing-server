import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Vote } from '../vote/vote.entity';
import { User } from '../user/user.entity';
import { Topic } from '../topic/topic.entity';
import { Comment } from '../comment/comment.entity';
import { ApprovalStatus } from '../utils.entity';

@ObjectType()
@Entity()
export class Tutorial {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @CreateDateColumn()
  submittedAt: Date;

  @Field(type => [Comment], { nullable: true })
  @OneToMany(
    type => Comment,
    comment => comment.tutorial,
  )
  comments?: Comment[];

  @Field(type => [Vote], { nullable: true })
  @OneToMany(
    type => Vote,
    vote => vote.tutorial,
  )
  votes?: Vote[];

  @Field(type => Int)
  score: number;

  @Field(type => Int)
  @Column()
  views: number;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.tutorials,
  )
  user: User;

  @Field(type => [Topic])
  @ManyToMany(
    type => Topic,
    tag => tag.tutorials,
  )
  @JoinTable()
  tags: Topic[];

  @Field(type => ApprovalStatus)
  @Column({ type: 'simple-enum', enum: ApprovalStatus })
  approvalStatusCode: string;
}
