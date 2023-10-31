/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class FavoriteBookDTO {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    bookId: string;
}