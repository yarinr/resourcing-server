import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Category, ApprovalStatus } from '../dal/utils.entity';
import { TopicService } from '../dal/topic/topic.service';
import { Topic } from 'src/dal/topic/topic.entity';
import { Tutorial } from 'src/dal/tutorial/tutorial.entity';

@Resolver()
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Query(returns => [Topic])
  async topics() {
    return await this.topicService.getAllTopics();
  }

  @Query(returns => Topic, { nullable: true })
  async topicByName(@Args('topicName') topicName: string) {
    return await this.topicService.getTopic(topicName);
  }

  @Query(returns => [Topic], { nullable: true })
  async TopicsByStatus(@Args('status') status: ApprovalStatus) {
    return await this.topicService.getTopicsByStatus(status);
  }

  @Query(returns => [Topic], { nullable: true })
  async TopicsByCategory(@Args('category') category: Category) {
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
