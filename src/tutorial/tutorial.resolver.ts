import { Resolver, Query, Args, Mutation, ArgsOptions } from '@nestjs/graphql';

import { TutorialService } from '../dal/tutorial/tutorial.service';
import { User } from 'src/dal/user/user.entity';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';
import { ApprovalStatus } from 'src/dal/utils.entity';

@Resolver()
export class TutorialResolver {
  constructor(private readonly tutorialService: TutorialService) {}
  @Query(returns => [Tutorial])
  async tutorials() {
    return this.tutorialService.getAllTutorials();
  }

  @Query(returns => Tutorial)
  async tutorialById(@Args('id') id: string) {
    return this.tutorialService.getTutorialbyId(id);
  }

  @Query(returns => Tutorial)
  async tutorial() {
    return [];
  }

  @Mutation(returns => Tutorial)
  async updateTutorialStatus(
    @Args('id') id: string,
    @Args('status') status: ApprovalStatus,
  ) {
    return this.tutorialService.updateTutorialStatus(id, status);
  }

  @Mutation(() => Tutorial)
  async addTutorial(
    @Args('title') title: string,
    @Args('url') url: string,
    @Args('desc') desc: string,
    @Args({ name: 'tags', type: () => [String] } as ArgsOptions) tags: [string],
  ) {
    return this.tutorialService.addNewTutorial(title, url, desc, tags);
  }

  @Mutation(returns => String)
  async deletTutorial(@Args('id') id: string) {
    return this.tutorialService.deleteTutorial(id);
  }
}
