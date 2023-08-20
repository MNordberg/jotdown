import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { NotesModule } from './modules/notes/notes.module';
import { DataSourceConfig } from './data-source-config';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DataSourceConfig,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      autoLoadEntities: true,
    }),
    UsersModule,
    NotesModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'notes',
            module: NotesModule,
          },
          {
            path: 'users',
            module: UsersModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
