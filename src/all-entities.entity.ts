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

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => String)
  @Column()
  userName: string;

  @Field(type => String)
  @Column()
  mail: string;

  @Field(type => [Tutorial], { nullable: true })
  @OneToMany(
    type => Tutorial,
    tutorial => tutorial.user,
  )
  tutorials?: Tutorial[];

  @Field(type => [Comment], { nullable: true })
  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments?: Comment[];

  @Field(type => [Tutorial], { nullable: true })
  @ManyToMany(
    type => Tutorial,
    tutorial => tutorial.id,
  )
  bookmarks?: Tutorial[];

  @Field(type => [Vote], { nullable: true })
  @OneToMany(
    type => Vote,
    vote => vote.user,
  )
  votes?: Vote[];

  @Field(type => Int)
  score: number;
}

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
export class Topic {
  @Field()
  @PrimaryColumn()
  name: string;
  constructor(name: string, icon: string, category: Category) {
    this.name = name;
    this.icon = icon;
    this.category = category;
    this.approvalStatusCode = ApprovalStatus.Pending;
  }

  @Field()
  @Column()
  icon: string;

  @Field(type => Category)
  @Column({ type: 'simple-enum', enum: Category })
  category: Category;

  @Field(type => [Tutorial, { nullable: true }], { nullable: true })
  @ManyToMany(
    type => Tutorial,
    tutorial => tutorial.tags,
  )
  tutorials?: Tutorial[];

  @Field(type => ApprovalStatus)
  @Column({ type: 'simple-enum', enum: ApprovalStatus })
  approvalStatusCode: string;
}

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
