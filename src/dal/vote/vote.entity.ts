import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { VoteType } from '../utils.entity';
import { User } from '../user/user.entity';
import { Tutorial } from '../tutorial/tutorial.entity';

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
