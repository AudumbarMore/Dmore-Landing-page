import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10, 'JWT_SECRET must be at least 10 characters'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables', parsed.error.format());
  throw new Error('Invalid environment variables');
}

const env = parsed.data;

export const config = {
  port: Number(env.PORT) || 4000,
  databaseUrl: env.DATABASE_URL,
  jwtSecret: env.JWT_SECRET,
};
