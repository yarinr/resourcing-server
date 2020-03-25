import { Resolver, Query } from '@nestjs/graphql';

import { TutorialService } from './tutorial.service';
import { User } from 'src/dal/user/user.entity';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';

@Resolver()
export class TutorialResolver {
  constructor(private readonly tutorialService: TutorialService) {}

  @Query(returns => [User])
  async users() {
    return [{ id: 1 } as User];
  }

  @Query(returns => [Tutorial])
  async tutorials() {
    return [];
  }

  @Query(returns => Tutorial)
  async tutorial() {
    return [];
  }
}
