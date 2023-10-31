import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/')
    getAll() {
        return this.usersService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const user = await this.usersService.getById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}