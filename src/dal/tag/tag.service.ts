import { Injectable } from '@nestjs/common';
import { ApprovalStatus } from 'src/dal/utils.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    this.tagRepository.save(new Tag('angular'));
    this.tagRepository.save(new Tag('react'));
    this.tagRepository.save(new Tag('linux'));
    this.tagRepository.save(new Tag('docker'));
    this.tagRepository.save(new Tag('css'));
    this.tagRepository.save(new Tag('less'));
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepository.find({ relations: ['tutorials'] });
  }

  async getTag(name: string): Promise<Tag> {
    return await this.tagRepository.findOne(name);
  }

  async createTag(name: string): Promise<Tag> {
    const tag = new Tag(name);
    const tagExist = await this.tagRepository.findOne(name);
    if (tagExist) {
      return tagExist;
    }
    return await this.tagRepository.save(tag);
  }

  async getTagsByStatus(status: ApprovalStatus): Promise<Tag[]> {
    return await this.tagRepository
      .createQueryBuilder()
      .where('tag.approvalStatusCode = :status', { status })
      .getMany();
  }

  async updateTagStatus(tagName: string, status: ApprovalStatus): Promise<Tag> {
    await this.tagRepository.update(tagName, {
      approvalStatusCode: status,
    });
    return await this.getTag(tagName);
  }
}
