import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@decider/shared/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbService extends PrismaClient {
    constructor(config: ConfigService) {
        const adapter = new PrismaPg({ connectionString: config.getOrThrow<string>('DATABASE_URL') });
        super({ adapter });
    }
}