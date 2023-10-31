import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
// @ts-ignore
import { Author } from '@prisma/client';

@Injectable()
export class AuthorsService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<Author[]> {
        // @ts-ignore
        return this.prismaService.author.findMany();
    }

    public getById(id: Author['id']): Promise<Author | null> {
        // @ts-ignore
        return this.prismaService.author.findUnique({
            where: { id },
        });
    }

    public async create(authorData: Omit<Author, 'id'>): Promise<Author> {
        try {
            // @ts-ignore
            return await this.prismaService.author.create({
                data: authorData,
            });
        } catch (error) {
            if (error.code === 'P2002')
                throw new ConflictException('Name is already taken');
            throw error;
        }
    }
}