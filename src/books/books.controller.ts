import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateBooksDTO } from './dtos/create-books-dto';
import { UpdateBooksDTO } from './dtos/update-books-dto';
import { FavoriteBookDTO } from './dtos/favorite.book.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get('/')
    getAll() {
        return this.booksService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const autho = await this.booksService.getById(id);
        if (!autho) throw new NotFoundException('Book not found');
        return autho;
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    create(@Body() bookData: CreateBooksDTO) {
        return this.booksService.create(bookData);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() bookData: UpdateBooksDTO,
    ) {
        if (!(await this.booksService.getById(id)))
            throw new NotFoundException('Book not found');

        await this.booksService.updateById(id, bookData);
        return { success: true };
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.booksService.getById(id)))
            throw new NotFoundException('Book not found');
        await this.booksService.deleteById(id);
        return { success: true };
    }

    @Post('/like')
    @UseGuards(JwtAuthGuard)
    likedBook(@Body() likeBook: FavoriteBookDTO) {
        return this.booksService.likedBook(likeBook);
    }
}