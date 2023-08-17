import { Controller, Get } from '@nestjs/common';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes({ filter, userId }): Promise<Note[]> {
    return this.notesService.findMatching({ filter, userId });
  }
}
