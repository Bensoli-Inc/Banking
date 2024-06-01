'use server'
// src/server/appwrite.js

import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { Databases, Users } from "node-appwrite";

// The name of your cookie that will store the session
//export const SESSION_COOKIE = "my-custom-session";

// Admin client, used to create new accounts 
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!); // Set the API key here!

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
    get database() {
        return new Databases(client);
    },
    get user() {
        return new Users(client);
    }
  };
}

// Session client, used to make requests on behalf of the logged in user
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.PUBLIC_APPWRITE_PROJECT!);

  // Get the session cookie from the request and set the session
 // const cookies = parseCookies(request.headers.get("cookie") ?? "");
  const session = cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Helper function to parse cookies
//function parseCookies(cookies) {
 // const map = new Map();
 // for (const cookie of cookies.split(";")) {
   // const [name, value] = cookie.split("=");
 //   map.set(name.trim(), value ?? null);
  //}
  //return map;
//}
