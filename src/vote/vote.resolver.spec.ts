import { Test, TestingModule } from '@nestjs/testing';
import { VoteResolver } from './vote.resolver';

describe('UserResolver', () => {
  let resolver: VoteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteResolver],
    }).compile();

    resolver = module.get<VoteResolver>(VoteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
