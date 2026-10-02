import { createAuthClient } from 'better-auth/react';
import {
    usernameClient,
    adminClient,
    inferAdditionalFields,
} from 'better-auth/client/plugins';

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        usernameClient({ displayUsername: false }),
        adminClient(),
        inferAdditionalFields({
            user: {
                role: {
                    type: 'string',
                    required: true,
                    defaultValue: 'user',
                    input: false, // Set to true if the field can be passed during sign-up
                    returned: true, // Set to true if it should be returned in API responses
                },
                wished_role: {
                    type: 'string',
                    required: true,
                    input: true, // Set to true if the field can be passed during sign-up
                    returned: true, // Set to true if it should be returned in API responses
                },
            },
        }),
    ],
});
export const { signIn, signUp, useSession } = createAuthClient();
