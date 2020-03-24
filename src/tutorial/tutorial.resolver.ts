import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Arg } from 'type-graphql';

import { User, Tutorial, Tag } from './tutorial.entity';
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

  @Query(returns => [Tutorial])
  async tutorialsByTag(@Arg('tag') tag: string) {
    return [];
  }

  @Query(returns => [Tag])
  async tags() {
    const tag = await this.tutorialService.getAllTags('amir');
    return tag;
  }

  @Mutation(() => Tag)
  async createTag(@Args('name') name: string) {
    return await this.tutorialService.createTag(name);
  }
}
