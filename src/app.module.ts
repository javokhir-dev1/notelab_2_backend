import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { NotebooksModule } from './notebooks/notebooks.module';

import { User } from './users/entities/user.entity';
import { Notebook } from './notebooks/entities/notebook.entity'; 
import { SettingsModule } from './settings/settings.module';
import { Setting } from './settings/entities/setting.entity';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("HOST"),
        port: parseInt(configService.get<string>("DB_PORT", "5432")),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Notebook, Setting, Note],
        synchronize: true,
      })
    }),
    UsersModule,
    AuthModule,
    NotebooksModule, 
    SettingsModule,
    NotesModule
  ],
})
export class AppModule { }
