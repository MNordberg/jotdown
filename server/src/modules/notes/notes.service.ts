import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}

  findMatching({ filter, userId }): Promise<Note[]> {
    const where: FindOptionsWhere<Note> = {};
    if (filter) {
      where.text = Like(`%${filter}%`);
    }
    if (userId) {
      where.user = { id: userId };
    }
    return this.repository.find({ where });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  create(note: Note) {
    return this.repository.create(note);
  }

  update(note: Note) {
    return this.repository.update(note.id, note);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
