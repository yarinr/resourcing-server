import { Injectable } from '@nestjs/common';
import {
  Topic,
  CreateTopicDTO,
  ApprovalStatus,
  CategoryName,
} from '../entities';

@Injectable()
export class TopicService {
  public topics: Topic[] = [];

  constructor() {
    this.topics.push(
      ...[
        {
          id: '1',
          name: 'angular',
          icon: 'angular path',
          categoryId: CategoryName.Programming,
          status: ApprovalStatus.Approved,
        },
        {
          id: '2',
          name: 'css',
          icon: 'css path',
          categoryId: CategoryName.Design,
          status: ApprovalStatus.Approved,
        },
        {
          id: '3',
          name: 'linux',
          icon: 'linux path',
          categoryId: CategoryName.DevOps,
          status: ApprovalStatus.Approved,
        },
      ],
    );
  }

  async getTopic(id: string): Promise<Topic> {
    return await this.topics.find(topic => topic.id === id);
  }

  async deleteTopic(topicId: string): Promise<Topic> {
    const topicToDelete = this.getTopic(topicId);
    this.topics = this.topics.filter(topic => topic.id !== topicId);
    return topicToDelete;
  }

  async addTopic(createTopic: CreateTopicDTO): Promise<Topic> {
    const newTopic: Topic = new Topic(createTopic);
    this.topics.push(newTopic);
    return newTopic;
  }

  async getTopicsByStatus(status: ApprovalStatus): Promise<Topic[]> {
    return await this.topics.filter(topic => topic.status === status);
  }

  async getTopicsByCategory(category: CategoryName): Promise<Topic[]> {
    return await this.topics.filter(topic => topic.categoryId === category);
  }

  // TO DO: combine functions
  async approveTopic(topicId: string) {
    const topic: Topic = await this.deleteTopic(topicId);
    topic.status = ApprovalStatus.Approved;
    this.topics.push(topic);
    return topic;
  }

  async rejectTopic(topicId: string) {
    const topic: Topic = await this.deleteTopic(topicId);
    topic.status = ApprovalStatus.Rejected;
    this.topics.push(topic);
    return topic;
  }
}
