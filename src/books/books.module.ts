import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
})
export class BooksModule {}