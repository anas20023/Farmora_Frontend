import { createAuthClient } from 'better-auth/client';
import { usernameClient, adminClient, inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        usernameClient({ displayUsername: false }),
        adminClient(),
        inferAdditionalFields({
            user: {
                role: {
                    type: 'string',
                },
            },
        }),
    ],
});
