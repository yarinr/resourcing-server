import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Repository, Like } from 'typeorm';
import { Tutorial } from '../tutorial/tutorial.entity';
import { User } from '../user/user.entity';
import { VoteType } from '../utils.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tutorial)
    private readonly tutorialRepository: Repository<Tutorial>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async getAllVotes(): Promise<Vote[]> {
    return await this.voteRepository.find({ relations: ['tutorial', 'user'] });
  }

  async getVote(id: string): Promise<Vote | void> {
    return await this.voteRepository
      .findOne(id, { relations: ['tutorial', 'user'] })
      .catch((error: Error) => console.log(error.message));
  }

  async getUserVoteHistory(userId: string): Promise<Vote[] | void> {
    return await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoinAndSelect('vote.tutorial', 'tutorial')
      .leftJoinAndSelect('vote.user', 'user')
      .where('vote.userId = :userId', { userId })
      .getMany();
  }

  async getTutorialVotes(tutorialId: string): Promise<Vote[] | void> {
    return await this.voteRepository
      .createQueryBuilder('vote')
      .leftJoinAndSelect('vote.tutorial', 'tutorial')
      .leftJoinAndSelect('vote.user', 'user')
      .where('vote.tutorialId = :tutorialId', { tutorialId })
      .getMany();
  }

  async addVote(
    voteType: VoteType,
    tutorialId: string,
    userId: string,
  ): Promise<Vote | void> {
    const previosVote = await this.voteRepository
      .createQueryBuilder('vote')
      .where('vote.tutorialId = :tutorialId', { tutorialId })
      .andWhere('vote.userId = :userId', { userId })
      .getOne();
    if (previosVote) {
      this.voteRepository.update(previosVote.id, {
        votedAt: new Date(),
        type: voteType,
      });
      return this.getVote(previosVote.id);
    }
    const vote = new Vote();
    vote.type = voteType;
    vote.votedAt = new Date();
    try {
      vote.tutorial = await this.tutorialRepository.findOneOrFail(tutorialId);
      vote.user = await this.userRepository.findOneOrFail(userId);
      return await this.voteRepository.save(vote);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }

  async removeVote(id: string): Promise<Vote | void> {
    const vote = await this.getVote(id);
    await this.voteRepository
      .delete(id)
      .then(() => console.log('vote with id: ' + id + ' removed successfuly'))
      .catch((error: Error) => console.log(error.message));
    return vote;
  }
}
