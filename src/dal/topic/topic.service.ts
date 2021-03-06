import { Injectable } from '@nestjs/common';
import { Category, ApprovalStatus } from 'src/dal/utils.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from 'src/dal/topic/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {
    this.topicRepository.save(
      new Topic('angular', 'angular.io', Category.PROGRAMMING),
    );
    this.topicRepository.save(
      new Topic('react', 'react.io', Category.PROGRAMMING),
    );
    this.topicRepository.save(new Topic('linux', 'linux.io', Category.DEVOPS));
    this.topicRepository.save(
      new Topic('docker', 'docker.io', Category.DEVOPS),
    );
    this.topicRepository.save(new Topic('css', 'css.io', Category.DESIGN));
    this.topicRepository.save(new Topic('less', 'less.io', Category.DESIGN));
  }

  async getAllTopics(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }

  async getTopic(name: string): Promise<Topic> {
    return await this.topicRepository.findOne(name);
  }

  async createTopic(
    name: string,
    icon: string,
    category: Category,
  ): Promise<Topic> {
    const newTopic = new Topic(name, icon, category);
    await this.topicRepository
      .save(newTopic)
      .then(topic =>
        console.log('topic with name: ' + topic.name + ' created successfuly'),
      )
      .catch((error: Error) => console.log(error.message));
    return await this.getTopic(newTopic.name);
  }

  async getTopicsByStatus(status: ApprovalStatus): Promise<Topic[]> {
    return await this.topicRepository
      .createQueryBuilder()
      .where('topic.approvalStatusCode = :status', { status })
      .getMany();
  }

  async getTopicsByCategory(category: Category): Promise<Topic[]> {
    return await this.topicRepository
      .createQueryBuilder()
      .where('topic.category = :category', { category })
      .getMany();
  }

  async updateTopicStatus(
    topicName: string,
    status: ApprovalStatus,
  ): Promise<Topic> {
    await this.topicRepository
      .update(topicName, {
        approvalStatusCode: status,
      })
      .catch((error: Error) => console.log(error.message));

    return await this.getTopic(topicName);
  }
}
