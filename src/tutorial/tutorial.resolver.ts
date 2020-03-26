import { Resolver, Query } from '@nestjs/graphql';

import { TutorialService } from '../dal/tutorial/tutorial.service';
import { User } from 'src/dal/user/user.entity';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';

@Resolver()
export class TutorialResolver {
  constructor(private readonly tutorialService: TutorialService) {}
  @Query(returns => [Tutorial])
  async tutorials() {
    return [];
  }

  @Query(returns => Tutorial)
  async tutorial() {
    return [];
  }
}
