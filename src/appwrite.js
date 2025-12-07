import { Client, Account, Databases } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID =import.meta.env.VITE_APPWRITE_PROJECT_ID;


const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
export const updateSearchCount = async (searchTerm, movie) => {
    
}
