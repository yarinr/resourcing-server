import { Injectable } from '@nestjs/common';
import { User, CreateUserDto, Tutorial } from '../entities';
import { TutorialService } from 'src/tutorial/tutorial.service';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      id: '206531741',
      name: 'ofir cohen',
      userName: 'ofir_cohen',
      mail: 'ofir2161324@gmail.com',
      points: 0,
      tutorials: [],
      bookmarks: [],
      votes: [],
    },
  ];

  constructor(private tutorialService: TutorialService) {}

  getUser(id: string): User {
    return this.users.find(user => user.id === id);
  }

  deleteUser(id: string): User {
    const removedUser: User = this.users.find(user => user.id === id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }

  addUser(createUser: CreateUserDto): User {
    let newUser = new User(createUser);
    this.users.push(newUser);
    return newUser;
  }

  addBookmark(userId: string, tutorialId: string): Tutorial {
    const tutorial = this.tutorialService.getTutorial(tutorialId);
    const updatedUser: User = this.deleteUser(userId);
    updatedUser.bookmarks.push(tutorial);
    this.users.push(updatedUser);
    return tutorial;
  }

  addTutorial(userId: string, tutorialId: string): Tutorial {
    const tutorial = this.tutorialService.getTutorial(tutorialId);
    const updatedUser: User = this.deleteUser(userId);
    updatedUser.tutorials.push(tutorial);
    this.users.push(updatedUser);
    return tutorial;
  }
}
