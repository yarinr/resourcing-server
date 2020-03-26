import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entity';
import { Tutorial } from '../tutorial/tutorial.entity';

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
