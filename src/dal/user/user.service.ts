import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // getUser(id: string): User {
  //   return this.users.find(user => user.id === id);
  // }

  // deleteUser(id: string): User {
  //   const removedUser: User = this.getUser(id);
  //   this.users = this.users.filter(user => user.id !== id);
  //   return removedUser;
  // }

  // register(createUser: CreateUserDTO): User {
  //   let newUser = new User(createUser);
  //   this.users.push(newUser);
  //   return newUser;
  // }

  // addBookmark(userId: string, tutorialId: string): User {
  //   const updatedUser: User = this.deleteUser(userId);
  //   updatedUser.bookmarkIds.push(tutorialId);
  //   this.users.push(updatedUser);
  //   return updatedUser;
  // }

  // deleteBookmark(userId: string, tutorialId: string): User {
  //   const updatedUser: User = this.deleteUser(userId);
  //   updatedUser.bookmarkIds = updatedUser.bookmarkIds.filter(
  //     tutorial => tutorial !== tutorialId,
  //   );
  //   this.users.push(updatedUser);
  //   return updatedUser;
  // }

  // addTutorial(userId: string, tutorialId: string): User {
  //   const updatedUser: User = this.getUser(userId);
  //   this.users = this.users.filter(user => user.id !== userId);
  //   updatedUser.tutorialIds.push(tutorialId);
  //   this.users.push(updatedUser);
  //   return updatedUser;
  // }

  // deleteTutorial(userId: string, tutorialId: string): User {
  //   const updatedUser: User = this.deleteUser(userId);
  //   updatedUser.tutorialIds = updatedUser.tutorialIds.filter(
  //     tutorial => tutorial !== tutorialId,
  //   );
  //   this.users.push(updatedUser);
  //   return updatedUser;
  // }
}
