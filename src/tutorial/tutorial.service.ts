import { Injectable } from '@nestjs/common';
import { Tag } from './tutorial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async createTag(name: string): Promise<Tag> {
    const tag = new Tag();
    tag.name = name;
    return this.tagRepository.save(tag);
  }
}
