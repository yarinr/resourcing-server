import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Arg } from 'type-graphql';

import { User, Tutorial, Tag } from './tutorial.entity';
import { TutorialService } from './tutorial.service';

@Resolver()
export class TutorialResolver {
  constructor(private readonly tutorialService: TutorialService) {}

  @Query(returns => [User])
  async users() {
    return [<User>{ id: 1 }];
  }

  @Query(returns => [Tutorial])
  async tutorials() {
    return [];
  }

  @Query(returns => Tutorial)
  async tutorial() {
    return [];
  }

  @Query(returns => [Tutorial])
  async tutorialsByTag(@Arg('tag') tag: string) {
    return [];
  }

  @Query(returns => [Tag])
  async tags() {
    return [];
  }

  @Mutation(() => Tag)
  async createTag(@Arg('name') name: string) {
    return await this.tutorialService.createTag(name);
  }
}
