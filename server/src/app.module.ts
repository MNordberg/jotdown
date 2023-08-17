import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { NotesModule } from './modules/notes/notes.module';
import { OrmConfig } from './orm-config';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...OrmConfig,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      autoLoadEntities: true,
    }),
    UsersModule,
    NotesModule,
    RouterModule.register([
      {
        path: 'notes',
        module: NotesModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
