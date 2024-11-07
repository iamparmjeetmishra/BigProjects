import "server-only"

import { Client, Account, Storage, Users, Databases } from "node-appwrite"
import { NEXT_APPWRITE_KEY, NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT } from "./constants"

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(NEXT_APPWRITE_KEY!)
  
  return {
    get account() {
      return new Account(client)
    }
  }
}