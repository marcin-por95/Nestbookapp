import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateAuthorDTO } from './dtos/create-author-dto';
import { UpdateAuthorDTO } from './dtos/update-author-dto';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @Get('/')
    getAll() {
        return this.authorsService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const autho = await this.authorsService.getById(id);
        if (!autho) throw new NotFoundException('Author not found');
        return autho;
    }

    @Post('/')
    create(@Body() authorData: CreateAuthorDTO) {
        return this.authorsService.create(authorData);
    }

    @Put('/:id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() authorData: UpdateAuthorDTO,
    ) {
        if (!(await this.authorsService.getById(id)))
            throw new NotFoundException('Author not found');

        await this.authorsService.updateById(id, authorData);
        return { success: true };
    }
    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.authorsService.getById(id)))
            throw new NotFoundException('Author not found');
        await this.authorsService.deleteById(id);
        return { success: true };
    }
}