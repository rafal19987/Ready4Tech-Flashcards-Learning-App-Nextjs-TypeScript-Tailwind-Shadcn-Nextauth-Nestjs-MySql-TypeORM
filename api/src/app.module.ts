import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
