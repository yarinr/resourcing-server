import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Category, ApprovalStatus } from '../utils.entity';
import { Tutorial } from '../tutorial/tutorial.entity';

@ObjectType()
@Entity()
export class Tag {
  constructor(name: string) {
    this.name = name;
    this.approvalStatusCode = ApprovalStatus.Pending;
  }
  @Field()
  @PrimaryColumn()
  name: string;

  @Field(type => [Tutorial, { nullable: true }], { nullable: true })
  @ManyToMany(
    type => Tutorial,
    tutorial => tutorial.tags,
  )
  @JoinTable()
  tutorials?: Tutorial[];

  @Field(type => ApprovalStatus)
  @Column({ type: 'simple-enum', enum: ApprovalStatus })
  approvalStatusCode: string;
}
