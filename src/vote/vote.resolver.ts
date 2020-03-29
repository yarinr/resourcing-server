import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { VoteType } from 'src/dal/utils.entity';
import { Vote } from 'src/dal/vote/vote.entity';
import { VoteService } from 'src/dal/vote/vote.service';

@Resolver(Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Query(returns => [Vote])
  async votes() {
    return await this.voteService.getAllVotes();
  }

  @Query(returns => [Vote], { nullable: true })
  async userVoteHistory(@Args('userId') userId: string) {
    return await this.voteService.getUserVoteHistory(userId);
  }

  @Query(returns => Vote, { nullable: true })
  async getVoteById(@Args('voteId') voteId: string) {
    return await this.voteService.getVote(voteId);
  }

  @Query(() => [Vote])
  async getTutorialVotes(@Args('tutorialId') tutorialId: string) {
    return await this.voteService.getTutorialVotes(tutorialId);
  }

  @Mutation(() => Vote)
  async addVote(
    @Args('voteType') voteType: VoteType,
    @Args('tutorialId') tutorialId: string,
    @Context() context: any,
  ) {
    return await this.voteService.addVote(
      voteType,
      tutorialId,
      context.req.header('userID'),
    );
  }

  @Mutation(() => Vote)
  async removeVote(@Args('voteId') voteId: string) {
    return await this.voteService.removeVote(voteId);
  }
}
