import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';
import { Tag } from '../tag/tag.entity';
import { ApprovalStatus } from '../utils.entity';
import { TagService } from '../tag/tag.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(Tutorial)
    private readonly tutorialRepository: Repository<Tutorial>,
    private userService: UserService,
    private tagService: TagService,
  ) {
    // const tutorial = new Tutorial(
    //   'python4beginners',
    //   'https://www.python.org/about/gettingstarted/',
    //   'learn python quickly',
    // );
    // const tag1 = new Tag('Python');
    // tutorial.tags = [tag1];
    // this.tutorialRepository.save(tutorial);
  }

  // Quereis
  async getAllTutorials() {
    return await this.tutorialRepository.find();
  }

  async getTutorialbyId(id: string): Promise<Tutorial> {
    return await this.tutorialRepository.findOne(id);
  }

  // mutations
  async updateTutorialStatus(
    id: string,
    status: ApprovalStatus,
  ): Promise<Tutorial> {
    const tutorial = await this.getTutorialbyId(id);
    if (status === ApprovalStatus.Approved) {
      tutorial.tags.forEach(tag =>
        this.tagService.updateTagStatus(tag.name, status),
      );
    }
    await this.tutorialRepository.update(id, {
      approvalStatusCode: status,
    });
    return await this.getTutorialbyId(id);
  }

  async addNewTutorial(
    title: string,
    url: string,
    description: string,
    tagNames: [string],
    userId: string,
  ): Promise<void | Tutorial> {
    const user = await this.userService.getUser(userId);
    if (user) {
      const tutorial = new Tutorial(title, url, description);
      const tags: Tag[] = [];
      for (const tagName of tagNames) {
        const tag: Tag = await this.tagService.createTag(tagName);
        tags.push(tag);
      }
      tutorial.tags = tags;
      tutorial.user = user;
      return await this.tutorialRepository.save(tutorial);
    }
  }

  async deleteTutorial(id: string): Promise<string> {
    await this.tutorialRepository.delete(id).catch((e: Error) => {
      throw JSON.stringify(e);
    });
    return 'delete succesfull';
  }

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
}
