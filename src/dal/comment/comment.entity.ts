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
  constructor(content: string) {
    this.content = content;
  }

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.comments,
    { cascade: true, eager: true },
  )
  user: User;

  @Field(type => Tutorial)
  @ManyToOne(
    type => Tutorial,
    tutorial => tutorial.comments,
    { cascade: true, eager: true },
  )
  tutorial: Tutorial;

  @Field()
  @Column()
  content: string;

  @Field()
  @CreateDateColumn()
  postedAt: Date;
}
