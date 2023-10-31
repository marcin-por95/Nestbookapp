/* eslint-disable prettier/prettier */

import {
    IsNotEmpty,
    Length,
    IsString,
    IsInt,
    Max,
    Min,
    IsUUID,
} from 'class-validator';

export class UpdateBooksDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    title: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1000)
    price: number;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    authorId: string;

};