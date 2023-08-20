import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}

  findMatching({ filter, userId }): Promise<Note[]> {
    const like = filter && `%${filter}%`;
    return this.repository
      .createQueryBuilder('note')
      .innerJoinAndSelect('note.user', 'user')
      .where(
        new Brackets((q) =>
          q.where(':userId IS NULL', { userId }).orWhere('user.id = :userId', {
            userId,
          }),
        ),
      )
      .andWhere(
        new Brackets((q) =>
          q
            .where(':filter IS NULL', { filter })
            .orWhere('note.text LIKE :like', { like })
            .orWhere('user.firstName LIKE :like', { like })
            .orWhere('user.lastName LIKE :like', { like }),
        ),
      )
      .orderBy('date', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  save(note: Note) {
    return this.repository.save(note);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
