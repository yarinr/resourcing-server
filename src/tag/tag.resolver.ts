import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { TagService } from 'src/dal/tag/tag.service';
import { Tag } from 'src/dal/tag/tag.entity';
import { ApprovalStatus } from 'src/dal/utils.entity';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag])
  async tags() {
    return await this.tagService.getAllTags();
  }

  @Query(() => Tag, { nullable: true })
  async TagsByName(@Args('tagName') tagName: string) {
    return await this.tagService.getTag(tagName);
  }

  @Query(() => [Tag], { nullable: true })
  async TagsByStatus(@Args('status') status: ApprovalStatus) {
    return await this.tagService.getTagsByStatus(status);
  }

  @Query(returns => [Tutorial], { nullable: true })
  async tutorialsByTag(@Args('tagName') tagName: string) {
    const tag = await this.tagService.getTag(tagName);
    return tag.tutorials;
  }

  @Mutation(() => Tag)
  async createTag(@Args('tagName') tagName: string) {
    return await this.tagService.createTag(tagName);
  }

  @Mutation(() => Tag)
  async updateTagStatus(
    @Args('tagName') tagName: string,
    @Args('status') status: ApprovalStatus,
  ) {
    return await this.tagService.updateTagStatus(tagName, status);
  }
}
