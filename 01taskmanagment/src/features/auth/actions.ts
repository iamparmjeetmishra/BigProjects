
import {
	AUTH_COOKIE,
	NEXT_PUBLIC_APPWRITE_ENDPOINT,
	NEXT_PUBLIC_APPWRITE_PROJECT,
} from "@/lib/constants";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

export const getCurrentUser = async () => {
	try {
		const client = new Client()
			.setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			.setProject(NEXT_PUBLIC_APPWRITE_PROJECT!);

		const session = cookies().get(AUTH_COOKIE);

    if (!session) return null;
    
    client.setSession(session.value);

		const account = new Account(client);

		return await account.get();
	} catch (error) {
		console.log(error);
		return null;
	}
};
