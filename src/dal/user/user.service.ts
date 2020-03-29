import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserLevel } from '../utils.entity';
import { Tutorial } from '../tutorial/tutorial.entity';

@Injectable()
export class UserService {
  private readonly relations = {
    relations: ['tutorials', 'bookmarks', 'comments', 'votes'],
  };
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tutorial)
    private readonly tutorialRepository: Repository<Tutorial>,
  ) {
    this.userRepository.save(
      new User('Amir Halabi', 'amir_halabi', 'amir@gmail.com', UserLevel.ADMIN),
    );
    this.userRepository.save(
      new User(
        'Ofir Cohen',
        'ofir_cohen',
        'ofir2161324@gmail.com',
        UserLevel.ADMIN,
      ),
    );
    this.userRepository.save(
      new User('Gaya Simner', 'gaya_simner', 'gaya@gmail.com', UserLevel.ADMIN),
    );
    this.userRepository.save(
      new User(
        'Yarin Ronel',
        'yarin_ronel',
        'yarin@gmail.com',
        UserLevel.ADMIN,
      ),
    );
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find(this.relations);
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, this.relations);
    return user ? user : undefined;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userRepository.findOne(id);
    await this.userRepository
      .remove(deletedUser)
      .then(user =>
        console.log('user with id: ' + user.id + 'removed successfuly'),
      )
      .catch((error: Error) => console.log(error.message));
    return deletedUser;
  }

  async register(
    name: string,
    userName: string,
    mail: string,
    userLevel: UserLevel,
  ): Promise<User | void> {
    const newUser = new User(name, userName, mail, userLevel);
    await this.userRepository
      .save(newUser)
      .then(user =>
        console.log('user with id: ' + user.id + ' created successfuly'),
      )
      .catch((error: Error) => console.log(error.message));
    return await this.getUser(newUser.id);
  }

  async toggleBookmark(
    userId: string,
    tutorialId: string,
  ): Promise<User | void> {
    const tutorial: Tutorial | void = await this.tutorialRepository
      .findOne(tutorialId)
      .catch((error: Error) =>
        console.log(error.message + 'error accured during toggle'),
      );

    const updatedUser: User = await this.getUser(userId);
    if (!tutorial || !updatedUser) {
      console.log(
        updatedUser
          ? 'user with id: ' + userId + ' found in db'
          : 'user with id: ' + userId + ' not found in db',
      );
      console.log(
        tutorial
          ? 'tutorial with id: ' + tutorialId + ' found in db'
          : 'tutorial with id: ' + tutorialId + ' not found in db',
      );
      return undefined;
    } else {
      if (
        updatedUser.bookmarks.map(tutorial => tutorial.id).includes(tutorialId)
      ) {
        console.log(
          'REMOVING tutorial with id ' +
            tutorialId +
            ' from bookmarks in user with id ' +
            userId,
        );
        updatedUser.bookmarks = updatedUser.bookmarks.filter(
          tutorial => tutorial.id !== tutorialId,
        );
      } else {
        console.log(
          'ADDING tutorial with id ' +
            tutorialId +
            ' to bookmarks in user with id ' +
            userId,
        );
        updatedUser.bookmarks.push(tutorial);
      }
      await this.userRepository.save(updatedUser);
      return await this.getUser(updatedUser.id);
    }
  }
}
