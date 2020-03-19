import { UserService } from './user/user.service';
import { v4 as uuid } from 'uuid';

export class User {
  constructor(createUserDto: CreateUserDto) {
    this.id = createUserDto.id;
    this.name = createUserDto.name;
    this.userName = createUserDto.userName;
    this.mail = createUserDto.mail;
    this.points = 0;
    this.tutorials = [];
    this.bookmarks = [];
    this.votes = [];
  }

  id: string;
  name: string;
  userName: string;
  mail: string;
  // sum of upvotes from uploaded tutorials & upvotes he got from useful comments he wrote
  points: number;
  tutorials: Tutorial[];
  bookmarks: Tutorial[];
  votes: Vote[];
}

export class CreateUserDto {
  id: string;
  name: string;
  userName: string;
  mail: string;
}

export interface Vote {
  entity: 'Comment' | 'Tutorial';
  typeId: string;
  type: 'Negative' | 'Positive';
}

// Tutorial

export class Tutorial {
  constructor(createTutorialDto: CreateTutorialDto, userService: UserService) {
    this.id = uuid();
    this.name = createTutorialDto.name;
    this.description = createTutorialDto.description;
    this.url = createTutorialDto.url;
    this.submitter = userService.getUser(createTutorialDto.userId);
    // this.tags = this.topicService.getTopicsByIds(createTutorialDto.tagIds);
    this.tags = [];
    this.votes = [];
    this.comments = [];
    this.date = new Date();
    this.views = 0;
  }

  id: string;
  name: string;
  description: string;
  url: string;
  submitter: User;
  votes: Vote[];
  comments: Comment[];
  date: Date;
  tags: Topic[];
  views: number;
}

export class CreateTutorialDto {
  name: string;
  description: string;
  url: string;
  userId: string;
  tagIds: string[];
}

// Comment

export class Comment {
  constructor(createCommentDto: CreateCommentDto, userService: UserService) {
    this.id = uuid();
    this.content = createCommentDto.content;
    this.votes = [];
    this.date = new Date();
    this.submmiter = userService.getUser(createCommentDto.userId);

    // this.tutorial = TutorialService.getTutorial(createCommentDto.tutorialId);
  }

  id: string;
  date: Date;
  content: string;
  votes: Vote[];
  submmiter: User;
  tutorial: Tutorial;
}

export class CreateCommentDto {
  id: string;
  content: string;
  userId: string;
  tutorialId: string;
}

// Category & Topic

export class Category {
  id: string;
  name: string;
  icon: string;
}

export class Topic {
  constructor(createTopicDto: CreateTopicDto) {
    this.id = uuid();
    this.name = createTopicDto.name;
    this.icon = createTopicDto.icon;
    // this.category = categoryService.getCategory(createTopicDto.categoryId);
  }

  id: string;
  name: string;
  icon: string;
  category: Category;
}

export class CreateTopicDto {
  name: string;
  icon: string;
  categoryId: string;
}
