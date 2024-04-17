import { Client, Account, ID, Databases, Query, Storage } from 'appwrite';

const client: Client = new Client().setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL))
    .setProject(String(process.env.NEXT_PUBLIC_ENDPOINT));

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID }