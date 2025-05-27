'use server'

import { cookies } from "next/headers"

export async function getUsernameFromCookies() {
    const cookieStore = await cookies();
    const username = cookieStore.get('username');

    if (username) {
        const usernameValue = username.value;
        return usernameValue;
    }

    return '';
}