import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Put()
  async saveNote(@Body() note: Note): Promise<Note> {
    return this.notesService.save(note);
  }

  @Delete(':id')
  async deleteNote(@Param() params): Promise<boolean> {
    const result = await this.notesService.delete(params.id);
    return result.affected > 0;
  }
}
