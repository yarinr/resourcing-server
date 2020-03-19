<<<<<<< HEAD
import { Injectable, Options } from '@nestjs/common';
import { Tag } from './tutorial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
=======
import { Injectable } from '@nestjs/common';
import {
  Tutorial,
  CreateTutorialDto,
  CreateCommentDto,
  Comment,
  createVoteDto,
  Vote,
} from '../entities';
import { UserService } from 'src/user/user.service';
>>>>>>> 88a59f9... deleted db related stuff & module imports needs to fixed + tutorial.controller.spec.ts needs to be added

@Injectable()
export class TutorialService {
  public tutorials: Tutorial[];

<<<<<<< HEAD
  async createTag(name: string): Promise<Tag> {
    const tag = new Tag(name);
    return this.tagRepository.save(tag);
=======
  constructor(private userService: UserService) {
    const createTutorial: CreateTutorialDto = {
      description: 'learn python quickly',
      name: 'python4beginners',
      url: 'https://www.python.org/about/gettingstarted/',
      userId: '206531741',
      tagIds: ['1'],
    };
    this.tutorials.push(new Tutorial(createTutorial, userService));
  }

  getTutorial(id: string): Tutorial {
    return this.tutorials.find(tutorial => tutorial.id === id);
  }

  addComment(createComment: CreateCommentDto): Tutorial {
    const newComment = new Comment(createComment, this.userService, this);
    const updatedTutorial: Tutorial = this.tutorials.find(
      tutorial => tutorial.id === createComment.tutorialId,
    );
    updatedTutorial.comments.push(newComment);
    const tutorialArray: Tutorial[] = this.tutorials.filter(
      tutorial => tutorial.id !== createComment.tutorialId,
    );
    tutorialArray.push(updatedTutorial);
    this.tutorials = tutorialArray;
    return updatedTutorial;
  }

  vote(createVote: createVoteDto): Tutorial {
    switch (createVote.entity) {
      case 'Comment':
        const updatedTutorial: Tutorial = this.tutorials.find(
          tutorial => tutorial.id === createVote.tutorialId,
        );
        const updatedEntity = updatedTutorial.comments.find(
          comment => comment.id === createVote.entityId,
        );
        updatedEntity.votes.push(new Vote(createVote, this.userService));
        const updatedComments: Comment[] = updatedTutorial.comments.filter(
          comment => comment.id !== createVote.entityId,
        );
        updatedComments.push(updatedEntity);
        updatedTutorial.comments = updatedComments;
        const tutorialArray: Tutorial[] = this.tutorials.filter(
          tutorial => tutorial.id !== createVote.tutorialId,
        );
        tutorialArray.push(updatedTutorial);
        this.tutorials = tutorialArray;
        return updatedTutorial;
      case 'Tutorial':
        const updatedTuto: Tutorial = this.tutorials.find(
          tutorial => tutorial.id === createVote.entityId,
        );
        updatedTuto.votes.push(new Vote(createVote, this.userService));
        const tutorialArr: Tutorial[] = this.tutorials.filter(
          tutorial => tutorial.id !== createVote.tutorialId,
        );
        tutorialArr.push(updatedTuto);
        this.tutorials = tutorialArr;
        return updatedTuto;
      default:
    }
  }

  deleteTutorial(id: string): Tutorial {
    const removedTutorial: Tutorial = this.tutorials.find(
      tutorial => tutorial.id === id,
    );
    this.tutorials = this.tutorials.filter(tutorial => tutorial.id !== id);
    return removedTutorial;
  }

  addTutorial(createTutorial: CreateTutorialDto): Tutorial {
    const newTutorial: Tutorial = new Tutorial(
      createTutorial,
      this.userService,
    );
    this.userService.addTutorial(createTutorial.userId, newTutorial.id);
    this.tutorials.push(newTutorial);
    return newTutorial;
>>>>>>> 88a59f9... deleted db related stuff & module imports needs to fixed + tutorial.controller.spec.ts needs to be added
  }

  async getAllTags(name: string): Promise<Tag[]> {
    const tag = new Tag(name);
    return this.tagRepository.find();
  }
}
