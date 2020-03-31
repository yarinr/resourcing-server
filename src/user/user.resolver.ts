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
import { UserLevel } from 'src/dal/utils.entity';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';
import { TutorialService } from 'src/dal/tutorial/tutorial.service';

@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly tutorialService: TutorialService,
  ) {}

  @ResolveProperty('score')
  async score(@Parent() user: User) {
    const tutorials: Tutorial[] = await (
      await this.userService.getUser(user.id)
    ).tutorials;
    let score: number = 0;
    for (const tutorial of tutorials) {
      const tutorialScore = await this.tutorialService.calculateScore(
        tutorial.id,
      );
      score += tutorialScore;
    }
    return score ? score : 0;
  }

  @Query(returns => [User])
  async users() {
    return await this.userService.getAllUsers();
  }

  @Query(returns => User)
  async getCurrentUser(@Context() context: any) {
    return await this.userService.getUser(context.req.header('userID'));
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
