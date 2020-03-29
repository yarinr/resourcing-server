import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Category, ApprovalStatus } from '../utils.entity';
import { Tutorial } from '../tutorial/tutorial.entity';

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

  @Field(type => [Tutorial], { nullable: true })
  @ManyToMany(
    type => Tutorial,
    tutorial => tutorial.tags,
  )
  tutorials?: Tutorial[];

  @Field(type => ApprovalStatus)
  @Column({ type: 'simple-enum', enum: ApprovalStatus })
  approvalStatusCode: ApprovalStatus;
}
