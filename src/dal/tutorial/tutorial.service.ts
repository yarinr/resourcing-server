import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';

@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(Tutorial)
    private readonly tutorialRepository: Repository<Tutorial>,
  ) {
    // const createTutorial: CreateTutorialDTO = {
    //   description: 'learn python quickly',
    //   name: 'python4beginners',
    //   url: 'https://www.python.org/about/gettingstarted/',
    //   userId: '206531741',
    //   tagIds: ['tagId1'],
    // };
    // const newTutorial = new Tutorial(createTutorial);
    // this.userService.addTutorial(createTutorial.userId, newTutorial.id);
    // this.tutorials.push(newTutorial);
  }

  // getTutorial(id: string): Tutorial {
  //   return this.tutorials.find(tutorial => tutorial.id === id);
  // }

  // addComment(createComment: CreateCommentDTO): Tutorial {
  //   const updatedTutorial: Tutorial = this.getTutorial(
  //     createComment.tutorialId,
  //   );
  //   const newComment = new Comment(createComment);
  //   updatedTutorial.commentIds.push(newComment.id);
  //   const tutorialArray: Tutorial[] = this.tutorials.filter(
  //     tutorial => tutorial.id !== createComment.tutorialId,
  //   );
  //   tutorialArray.push(updatedTutorial);
  //   this.tutorials = tutorialArray;
  //   return updatedTutorial;
  // }

  // deleteComment(commentId: string, tutorialId: string): Tutorial {
  //   const updatedTutorial: Tutorial = this.getTutorial(tutorialId);
  //   updatedTutorial.commentIds = updatedTutorial.commentIds.filter(
  //     comment => comment !== commentId,
  //   );
  //   const tutorialArray: Tutorial[] = this.tutorials.filter(
  //     tutorial => tutorial.id !== tutorialId,
  //   );
  //   tutorialArray.push(updatedTutorial);
  //   this.tutorials = tutorialArray;
  //   return updatedTutorial;
  // }

  // upvote(tutorialId: string, userId: string): Tutorial {
  //   const updatedTutorial: Tutorial = this.getTutorial(tutorialId);
  //   if (updatedTutorial.downvotes.includes(userId)) {
  //     console.log('a user cannot vote twice to the same tutorial');
  //     return updatedTutorial;
  //   }

  //   if (updatedTutorial.upvotes.includes(userId)) {
  //     updatedTutorial.upvotes = updatedTutorial.upvotes.filter(
  //       user => user !== userId,
  //     );
  //   } else {
  //     updatedTutorial.upvotes.push(userId);
  //   }

  //   const tutorialArray: Tutorial[] = this.tutorials.filter(
  //     tutorial => tutorial.id !== tutorialId,
  //   );
  //   tutorialArray.push(updatedTutorial);
  //   this.tutorials = tutorialArray;
  //   return updatedTutorial;
  // }

  // downvote(tutorialId: string, userId: string): Tutorial {
  //   const updatedTutorial: Tutorial = this.getTutorial(tutorialId);
  //   if (
  //     updatedTutorial.downvotes.includes(userId) ||
  //     updatedTutorial.upvotes.includes(userId)
  //   ) {
  //     console.log('a user cannot vote twice to the same tutorial');
  //     return updatedTutorial;
  //   }

  //   if (updatedTutorial.downvotes.includes(userId)) {
  //     updatedTutorial.downvotes = updatedTutorial.downvotes.filter(
  //       user => user !== userId,
  //     );
  //   } else {
  //     updatedTutorial.downvotes.push(userId);
  //   }

  //   const tutorialArray: Tutorial[] = this.tutorials.filter(
  //     tutorial => tutorial.id !== tutorialId,
  //   );
  //   tutorialArray.push(updatedTutorial);
  //   this.tutorials = tutorialArray;
  //   return updatedTutorial;
  // }

  // deleteTutorial(id: string): Tutorial {
  //   const removedTutorial: Tutorial = this.getTutorial(id);
  //   this.userService.deleteTutorial(removedTutorial.submitterId, id);
  //   this.tutorials = this.tutorials.filter(tutorial => tutorial.id !== id);
  //   return removedTutorial;
  // }

  // addTutorial(createTutorial: CreateTutorialDTO): Tutorial {
  //   const newTutorial: Tutorial = new Tutorial(createTutorial);
  //   this.userService.addTutorial(createTutorial.userId, newTutorial.id);
  //   this.tutorials.push(newTutorial);
  //   return newTutorial;
  // }
}
