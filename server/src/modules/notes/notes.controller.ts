import { Controller, Get } from '@nestjs/common';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller()
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(filter?: string, userId?: number): Promise<Note[]> {
    return this.notesService.findMatching({ filter, userId });
  }
}
