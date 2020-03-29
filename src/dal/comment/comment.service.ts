import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { UserService } from '../user/user.service';
import { TutorialService } from '../tutorial/tutorial.service';
import { Tutorial } from '../tutorial/tutorial.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private userService: UserService,
    private tutorialService: TutorialService,
  ) {}

  async getAllComments() {
    return await this.commentRepository.find({
      relations: ['tutorial', 'user'],
    });
  }

  async getCommentbyId(id: string): Promise<Comment> {
    return await this.commentRepository.findOne(id, {
      relations: ['tutorial', 'user'],
    });
  }

  async addNewComment(
    content: string,
    userId: string,
    tutorialId: string,
  ): Promise<Comment> {
    const user: User = await this.userService.getUser(userId);
    const tutorial: Tutorial = await this.tutorialService.getTutorialbyId(
      tutorialId,
    );
    if (tutorial && user) {
      const newComment: Comment = new Comment(content);
      newComment.tutorial = tutorial;
      newComment.user = user;
      return await this.commentRepository.save(newComment);
    } else {
      console.log(
        'tutorial with id: ' +
          tutorialId +
          ' or user with id: ' +
          userId +
          ' were not found in db',
      );
    }
  }

  async deleteComment(id: string): Promise<string> {
    await this.commentRepository.delete(id).catch((e: Error) => {
      throw JSON.stringify(e);
    });
    return 'delete succesfull';
  }
}
