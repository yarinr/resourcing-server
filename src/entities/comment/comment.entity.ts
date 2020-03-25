import { Field, ID, ObjectType } from 'type-graphql';
import {
  ManyToOne,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Tutorial } from '../tutorial/tutorial.entity';

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
