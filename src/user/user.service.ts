import { Injectable } from '@nestjs/common';
import { User, CreateUserDTO, Tutorial } from '../entities';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      id: '206531741',
      name: 'ofir cohen',
      userName: 'ofir_cohen',
      mail: 'ofir2161324@gmail.com',
      points: 0,
      tutorialIds: [],
      bookmarkIds: [],
    },
  ];

  constructor() {}

  getUser(id: string): User {
    return this.users.find(user => user.id === id);
  }

  deleteUser(id: string): User {
    const removedUser: User = this.getUser(id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }

  register(createUser: CreateUserDTO): User {
    let newUser = new User(createUser);
    this.users.push(newUser);
    return newUser;
  }

  addBookmark(userId: string, tutorialId: string): User {
    const updatedUser: User = this.deleteUser(userId);
    updatedUser.bookmarkIds.push(tutorialId);
    this.users.push(updatedUser);
    return updatedUser;
  }

  deleteBookmark(userId: string, tutorialId: string): User {
    const updatedUser: User = this.deleteUser(userId);
    updatedUser.bookmarkIds = updatedUser.bookmarkIds.filter(
      tutorial => tutorial !== tutorialId,
    );
    this.users.push(updatedUser);
    return updatedUser;
  }

  addTutorial(userId: string, tutorialId: string): User {
    const updatedUser: User = this.deleteUser(userId);
    updatedUser.tutorialIds.push(tutorialId);
    this.users.push(updatedUser);
    return updatedUser;
  }

  deleteTutorial(userId: string, tutorialId: string): User {
    const updatedUser: User = this.deleteUser(userId);
    updatedUser.tutorialIds = updatedUser.tutorialIds.filter(
      tutorial => tutorial !== tutorialId,
    );
    this.users.push(updatedUser);
    return updatedUser;
  }
}
