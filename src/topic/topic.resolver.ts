import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Category, ApprovalStatus } from '../entities/utils.entity';
import { TopicService } from './topic.service';
import { Arg } from 'type-graphql';
import { Topic } from 'src/entities/topic/topic.entity';
import { Tutorial } from 'src/entities/tutorial/tutorial.entity';

@Resolver()
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Query(returns => [Topic])
  async topics() {
    return await this.topicService.getAllTopics();
  }

  @Query(returns => Topic)
  async topicByName(@Arg('topicName') topicName: string) {
    return await this.topicService.getTopic(topicName);
  }

  @Query(returns => [Tutorial], { nullable: true })
  async tutorialsByTag(@Arg('tagName') tagName: string) {
    const topic = await this.topicService.getTopic(tagName);
    return topic.tutorials;
  }

  @Query(returns => [Topic], { nullable: true })
  async TopicsByStatus(@Arg('status') status: ApprovalStatus) {
    return await this.topicService.getTopicsByStatus(status);
  }

  @Query(returns => [Topic], { nullable: true })
  async TopicsByCategory(@Arg('category') category: Category) {
    return await this.topicService.getTopicsByCategory(category);
  }

  @Mutation(() => Topic)
  async createTopic(
    @Args('name') name: string,
    @Args('icon') icon: string,
    @Args('category') category: Category,
  ) {
    return await this.topicService.createTopic(name, icon, category);
  }

  @Mutation(() => Topic)
  async updateTopicStatus(
    @Args('topicName') topicName: string,
    @Args('status') status: ApprovalStatus,
  ) {
    return await this.topicService.updateTopicStatus(topicName, status);
  }
}
