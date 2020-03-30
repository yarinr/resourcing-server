import {
  Resolver,
  Query,
  Args,
  Mutation,
  ArgsOptions,
  Context,
} from '@nestjs/graphql';
import { CommentService } from 'src/dal/comment/comment.service';
import { Comment } from 'src/dal/comment/comment.entity';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Query(returns => [Comment])
  async comments() {
    return await this.commentService.getAllComments();
  }

  @Query(returns => Comment)
  async commentById(@Args('id') id: string) {
    return await this.commentService.getCommentbyId(id);
  }

  @Mutation(() => Comment)
  async addNewComment(
    @Args('content') content: string,
    @Args('tutorialId') tutorialId: string,
    @Context('userId') userID: string,
  ) {
    return await this.commentService.addNewComment(content, tutorialId, userID);
  }

  @Mutation(returns => String)
  async deleteComment(@Args('id') id: string) {
    return await this.commentService.deleteComment(id);
  }
}
