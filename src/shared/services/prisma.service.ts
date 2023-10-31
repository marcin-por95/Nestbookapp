import { Injectable, OnModuleInit } from '@nestjs/common';
// @ts-ignore
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        // @ts-ignore
        await this.$connect();
    }
}