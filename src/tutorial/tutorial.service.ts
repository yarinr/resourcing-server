import { Injectable, Options } from '@nestjs/common';
import { Tag } from './tutorial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async createTag(name: string): Promise<Tag> {
    const tag = new Tag(name);
    return this.tagRepository.save(tag);
  }

  async getAllTags(name: string): Promise<Tag[]> {
    const tag = new Tag(name);
    return this.tagRepository.find();
  }
}
