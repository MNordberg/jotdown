import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller()
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(@Query() query): Promise<Note[]> {
    return this.notesService.findMatching(query);
  }

  @Get(':id')
  getNote(@Param() params): Promise<Note> {
    return this.notesService.findOne(params.id);
  }

  @Post()
  createNote(@Body() note: Note): Note {
    return this.notesService.create(note);
  }

  @Put()
  async updateNote(@Body() note: Note): Promise<boolean> {
    const result = await this.notesService.update(note);
    return result.affected > 0;
  }

  @Delete(':id')
  async deleteNote(@Param() params): Promise<boolean> {
    const result = await this.notesService.delete(params.id);
    return result.affected > 0;
  }
}
