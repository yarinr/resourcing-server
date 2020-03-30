import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveProperty,
  Context,
} from '@nestjs/graphql';

import { User } from 'src/dal/user/user.entity';
import { UserService } from 'src/dal/user/user.service';
import { UserLevel, VoteType } from 'src/dal/utils.entity';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveProperty('score')
  async score(@Parent() user: User) {
    const tutorials: Tutorial[] = user.tutorials;
    const score: number = tutorials?.reduce(
      (totalAcc: number, tutorial) =>
        totalAcc +
        tutorial.votes?.reduce((voteAcc: number, vote) => {
          return (voteAcc =
            vote.type === VoteType.Upvote ? voteAcc + 1 : voteAcc - 1);
        }, 0),
      0,
    );
    return score ? score : 0;
  }

  @Query(returns => [User])
  async users() {
    return await this.userService.getAllUsers();
  }

  @Query(returns => User, { nullable: true })
  async userById(@Args('userId') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Mutation(() => User)
  async registerUser(
    @Args('name') name: string,
    @Args('userName') userName: string,
    @Args('mail') mail: string,
  ) {
    return await this.userService
      .register(name, userName, mail, UserLevel.USER)
      .catch((e: Error) => e);
  }

  @Mutation(() => User)
  async addNewAdmin(
    @Args('name') name: string,
    @Args('userName') userName: string,
    @Args('mail') mail: string,
  ) {
    return await this.userService
      .register(name, userName, mail, UserLevel.ADMIN)
      .catch((e: Error) => e);
  }

  @Mutation(() => User, { nullable: true })
  async toggleBookmark(
    @Args('tutorialId') tutorialId: string,
    @Context() context: any,
  ) {
    return await this.userService.toggleBookmark(
      context.req.header('userID'),
      tutorialId,
    );
  }
}
