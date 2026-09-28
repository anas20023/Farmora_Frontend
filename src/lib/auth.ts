import { betterAuth } from 'better-auth';
import { username } from 'better-auth/plugins';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export const auth = betterAuth({
    database: {
        dialect: new PostgresDialect({
            pool: new Pool({
                connectionString: process.env.DB_URL,
            }),
        }),
        type: 'postgres',
        schemaName: 'auth',
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    plugins: [username()],
    advanced: {
        database: {
            joins: true,
        },
    },
});
