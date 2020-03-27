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
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';

@ObjectType()
@Entity()
export class Tutorial {
  constructor(title: string, url: string, description: string, tags?: [Tag]) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.views = 0;
    this.score = 0;
    this.approvalStatusCode = ApprovalStatus.Pending;
  }

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

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

  // delete the { nullable: true } after finishing the user entity
  @Field(type => User, { nullable: true })
  @ManyToOne(
    type => User,
    user => user.tutorials,
  )
  user: User;

  @Field(type => [Tag])
  @ManyToMany(
    type => Tag,
    tag => tag.tutorials,
    { cascade: true, eager: true },
  )
  @JoinTable()
  tags: Tag[];

  @Field(type => ApprovalStatus)
  @Column({ type: 'simple-enum', enum: ApprovalStatus })
  approvalStatusCode: string;
}
