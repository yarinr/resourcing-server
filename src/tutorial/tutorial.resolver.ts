import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Arg } from 'type-graphql';

import { User, Tutorial, Topic, Category } from '../all-entities.entity';
import { TutorialService } from './tutorial.service';

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
