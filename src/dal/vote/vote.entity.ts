import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { VoteType } from '../utils.entity';
import { User } from '../user/user.entity';
import { Tutorial } from '../tutorial/tutorial.entity';

@ObjectType()
@Entity()
@Unique(['user', 'tutorial'])
export class Vote {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.votes,
    { cascade: true, eager: true },
  )
  user: User;

  @Field(type => Tutorial)
  @ManyToOne(
    type => Tutorial,
    tutorial => tutorial.votes,
    { cascade: true, eager: true },
  )
  tutorial: Tutorial;

  @Field(type => VoteType)
  @Column({ type: 'simple-enum', enum: VoteType })
  type: VoteType;

  @Field()
  @CreateDateColumn()
  votedAt: Date;
}
