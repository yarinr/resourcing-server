import { v4 as uuid } from 'uuid';
import { IsNotEmpty, IsEmail, IsUrl, IsArray } from 'class-validator';

export class User {
  constructor(createUserDto: CreateUserDTO) {
    this.id = createUserDto.id;
    this.name = createUserDto.name;
    this.userName = createUserDto.userName;
    this.mail = createUserDto.mail;
    this.points = 0;
    this.tutorialIds = [];
    this.bookmarkIds = [];
  }

  id: string;
  name: string;
  userName: string;
  mail: string;
  // sum of upvotes from uploaded tutorials
  points: number;
  tutorialIds: string[];
  bookmarkIds: string[];
}

export class CreateUserDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  userName: string;
  @IsEmail()
  mail: string;
}

// Tutorial

export class Tutorial {
  constructor(createTutorialDto: CreateTutorialDTO) {
    this.id = uuid();
    this.name = createTutorialDto.name;
    this.description = createTutorialDto.description;
    this.url = createTutorialDto.url;
    this.submitterId = createTutorialDto.userId;
    this.tagIds = createTutorialDto.tagIds;
    this.upvotes = [];
    this.downvotes = [];
    this.commentIds = [];
    this.date = new Date();
    this.views = 0;
  }

  id: string;
  name: string;
  description: string;
  url: string;
  submitterId: string;
  upvotes: string[];
  downvotes: string[];
  commentIds: string[];
  date: Date;
  tagIds: string[];
  views: number;
}

export class CreateTutorialDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsUrl()
  url: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  @IsArray()
  tagIds: string[];
}

// Comment

export class Comment {
  constructor(createCommentDto: CreateCommentDTO) {
    this.id = uuid();
    this.content = createCommentDto.content;
    this.votes = [];
    this.date = new Date();
    this.submmiterId = createCommentDto.userId;
    this.tutorialId = createCommentDto.tutorialId;
  }

  id: string;
  date: Date;
  content: string;
  votes: string[];
  submmiterId: string;
  tutorialId: string;
}

export class CreateCommentDTO {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  tutorialId: string;
}

// Category & Topic

export class Category {
  id: string;
  name: string;
  icon: string;
}

export class Topic {
  constructor(createTopicDto: CreateTopicDTO) {
    this.id = uuid();
    this.name = createTopicDto.name;
    this.icon = createTopicDto.icon;
    this.categoryId = createTopicDto.categoryId;
  }

  id: string;
  name: string;
  icon: string;
  categoryId: string;
}

export class CreateTopicDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  icon: string;
  @IsNotEmpty()
  categoryId: string;
}
