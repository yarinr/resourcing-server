import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entity';
import { Tutorial } from '../tutorial/tutorial.entity';
import { UserLevel } from '../utils.entity';

@ObjectType()
@Entity()
@Unique(['userName'])
@Unique(['mail'])
export class User {
  constructor(
    name: string,
    userName: string,
    mail: string,
    userLevel: UserLevel,
  ) {
    this.name = name;
    this.userName = userName;
    this.mail = mail;
    this.score = 0;
    this.userLevel = userLevel;
  }

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

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

  @Field(type => [Tutorial, { nullable: true }], { nullable: true })
  @ManyToMany(
    type => Tutorial,
    tutorial => tutorial.bookmarked,
  )
  @JoinTable()
  bookmarks?: Tutorial[];

  @Field(type => [Vote])
  @OneToMany(
    type => Vote,
    vote => vote.user,
    { cascade: true, eager: true },
  )
  votes?: Vote[];

  @Field(type => Int)
  score: number;

  @Field(type => UserLevel)
  @Column({ type: 'simple-enum', enum: UserLevel })
  userLevel: UserLevel;
}
