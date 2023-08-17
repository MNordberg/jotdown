import { Module } from '@nestjs/common';
import { Note } from './note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Note])],
})
export class NotesModule {}
