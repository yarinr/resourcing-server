import { registerEnumType } from 'type-graphql';

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
