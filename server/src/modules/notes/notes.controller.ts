import { Controller, Get, Query } from '@nestjs/common';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller()
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(@Query() query): Promise<Note[]> {
    return this.notesService.findMatching(query);
  }
}
