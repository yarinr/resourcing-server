import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => [Tutorial])
  @OneToMany(
    type => Tutorial,
    tutorial => tutorial.user,
  )
  tutorials: Tutorial[];

  @Field(type => [Comment])
  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @Field(type => [Vote])
  @OneToMany(
    type => Vote,
    vote => vote.user,
  )
  votes: Vote[];

  @Field(type => [Report])
  @OneToMany(
    type => Report,
    report => report.user,
  )
  reports: Report[];
}

export enum ApprovalStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
}
registerEnumType(ApprovalStatus, { name: 'ApprovalStatus' });

// tslint:disable-next-line: max-classes-per-file
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

  @Field(type => [Comment])
  @OneToMany(
    type => Comment,
    comment => comment.tutorial,
  )
  comments: Comment[];

  @Field(type => [Report])
  @OneToMany(
    type => Report,
    report => report.tutorial,
  )
  reports: Report[];

  @Field(type => [Vote])
  @OneToMany(
    type => Vote,
    vote => vote.tutorial,
  )
  votes: Vote[];

  @Field(type => Int)
  score: number;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.tutorials,
  )
  user: User;

  @Field(type => [Tag])
  @ManyToMany(
    type => Tag,
    tag => tag.tutorials,
  )
  @JoinTable()
  tags: Tag[];

  @Field(type => ApprovalStatus)
  @Column({ type: 'simple-enum', enum: ApprovalStatus })
  approvalStatusCode: string;
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
@Entity()
export class Comment {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.comments,
  )
  user: User;

  @Field(type => Tutorial)
  @OneToMany(
    type => Tutorial,
    tutorial => tutorial.comments,
  )
  tutorial: Tutorial;

  @Field()
  @Column()
  content: string;

  @Field()
  @CreateDateColumn()
  postedAt: Date;
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
@Entity()
export class Tag {
  @Field()
  @PrimaryColumn()
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @Field(type => [Tutorial])
  @ManyToMany(
    type => Tutorial,
    tutorial => tutorial.tags,
  )
  tutorials: Tutorial[];
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
@Entity()
export class Report {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.reports,
  )
  user: User;

  @Field(type => Tutorial)
  @OneToMany(
    type => Tutorial,
    tutorial => tutorial.reports,
  )
  tutorial: Tutorial;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  isResolved: boolean;

  @Field()
  @CreateDateColumn()
  reportedAt: Date;
}

export enum VoteType {
  Upvote = 'upvote',
  Downvote = 'downvote',
}
registerEnumType(VoteType, { name: 'VoteType' });

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
@Entity()
export class Vote {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.votes,
  )
  user: User;

  @Field(type => Tutorial)
  @ManyToOne(
    type => Tutorial,
    tutorial => tutorial.votes,
  )
  tutorial: Tutorial;

  @Field(type => VoteType)
  @Column({ type: 'simple-enum', enum: VoteType })
  type: VoteType;

  @Field()
  @CreateDateColumn()
  votedAt: Date;
}
