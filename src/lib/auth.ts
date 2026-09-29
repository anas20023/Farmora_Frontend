import { betterAuth } from 'better-auth';
import { admin, username } from 'better-auth/plugins';
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
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'user',
                input: true, // Set to true if the field can be passed during sign-up
                returned: true, // Set to true if it should be returned in API responses
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: false,
    },
    plugins: [
        username({
            displayUsername: false,
            immutableUsername: true,
            minUsernameLength: 5,
            maxUsernameLength: 100,
            usernameValidator: (username) => {
                if (username === 'admin') {
                    return false;
                }
                return true;
            },
            displayUsernameValidator: (displayUsername) => {
                return /^[a-zA-Z0-9_-]+$/.test(displayUsername);
            },
            usernameNormalization: (username) => {
                return username
                    .toLowerCase()
                    .replaceAll('0', 'o')
                    .replaceAll('3', 'e')
                    .replaceAll('4', 'a');
            },
        }),
        admin(),
    ],
    advanced: {
        database: {
            joins: true,
        },
    },
});
