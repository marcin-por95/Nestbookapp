import {
    Injectable,
    ConflictException,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book, User, UserOnBooks } from '@prisma/client';

@Injectable()
export class BooksService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<Book[]> {
        return this.prismaService.book.findMany({
            include: { author: true },
        });
    }

    public getById(id: Book['id']): Promise<Book | null> {
        return this.prismaService.book.findUnique({
            where: { id },
        });
    }

    public async create(
        bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Book> {
        const { authorId, ...otherData } = bookData;
        try {
            return await this.prismaService.book.create({
                data: {
                    ...otherData,
                    author: {
                        connect: { id: authorId },
                    },
                },
            });
        } catch (error) {
            if (error.code === 'P2002')
                throw new ConflictException('Title is already taken');
            if (error.code === 'P2025')
                throw new BadRequestException("Author doesn't exist");
            throw error;
        }
    }

    public async updateById(
        id: Book['id'],
        bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Book> {
        const { authorId, ...otherData } = bookData;
        try {
            return await this.prismaService.book.update({
                where: { id },
                data: {
                    ...otherData,
                    author: {
                        connect: { id: authorId },
                    },
                },
            });
        } catch (error) {
            if (error.code === 'P2002')
                throw new ConflictException('Title is already taken');
            if (error.code === 'P2025')
                throw new BadRequestException("Author doesn't exist");
            throw error;
        }
    }

    public async deleteById(id: Book['id']): Promise<Book> {
        try {
            return await this.prismaService.book.delete({
                where: { id },
            });
        } catch (error) {
            if (error.code === 'P2025')
                throw new NotFoundException('Book not found');
            throw error;
        }
    }

    public async likedBook(likeBookData: Omit<UserOnBooks, 'id'>): Promise<Book> {
        const { userId, bookId } = likeBookData;

        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        const book = await this.prismaService.book.findUnique({
            where: { id: bookId },
        });

        if (!user || !book) {
            throw new NotFoundException(
                !user ? 'User not found' : 'Book not found',
            );
        }

        return this.prismaService.book.update({
            where: { id: bookId },
            data: {
                users: {
                    create: {
                        user: {
                            connect: { id: userId },
                        },
                    },
                },
            },
        });
    }
}
