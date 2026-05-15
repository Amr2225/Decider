import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string(),
    WEB_ORIGIN: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
    PORT: z.string().optional().refine((port) => {
        if (!port) return false;
        return parseInt(port) > 0 && parseInt(port) < 65536
    }, { message: 'PORT must be a number between 1 and 65535' }),

    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),

    ACCESS_TOKEN_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
});

export type envSchemaType = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>) {
    const env = envSchema.safeParse(config);

    if (env.error) {
        const errorString = z.prettifyError(env.error);
        throw new Error('\n\x1b[31m Invalid environment variables: ' + errorString);
    }

    // this will be the key in the configSerive.get(<name>) the key that is returned from here
    return env.data;
}
