import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}

  findMatching({ filter, userId }): Promise<Note[]> {
    const where: any = {};
    if (filter) {
      where.text = filter;
    }
    if (userId) {
      where.user = { id: userId };
    }
    return this.repository.find({ where });
  }
}
