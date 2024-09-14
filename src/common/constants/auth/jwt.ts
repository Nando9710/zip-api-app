import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const JWT_CONSTANTS = {
  secret: configService.getOrThrow('JWT_SECRET'),
};