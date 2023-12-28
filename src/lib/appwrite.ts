"use client";
import { Client, Account, ID, Databases, Query } from "appwrite";

export const client = new Client();
const databases = new Databases(client);

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
const moodsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID;
const moodCollectionId = process.env.NEXT_PUBLIC_APPWRITE_MOOD_COLLECTION_ID;
const waitlistCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID;

type Mood = {
  $collectionId: string;
  $createdAt: Date;
  $databaseId: string;
  $id: string;
  $permissions: [];
  $updatedAt: Date;
  moods: string[];
  name: string;
};

if (!projectId && !databaseId && !usersCollectionId) {
  throw new Error("APPWRITE_ENDPOINT is not defined");
}

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId!);

export const account = new Account(client);

const addEmailToWaitingList = async (email: string) => {
  try {
    const waitingList = await databases.listDocuments(
      databaseId!,
      waitlistCollectionId!
    );

    const user = waitingList.documents.find(
      (user) => user.email === email
    ) as any;

    if (user) {
      throw new Error("Email already in waiting list");
    }

    // add email to waiting list
    const data = {
      email: email,
    };

    await databases.createDocument(
      databaseId!,
      waitlistCollectionId!,
      ID.unique(),
      data
    );

    return {
      status: "200",
    };
  } catch (error) {
    throw new Error("Email already in waiting list");
  }
};

const loginUser = async () => {
  try {
    const login = account.createOAuth2Session(
      "google",
      "http://localhost:3000/dashboard",
      "http://localhost:3000"
    );

    return {
      ...login,
      status: "200",
    };
  } catch (error) {
    console.error(error);
  }
};

const getUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error(error);
  }
};

const getUserFromDatabase = async () => {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const userFromDatabase = await databases.listDocuments(
      databaseId!,
      usersCollectionId!,
      [Query.equal("id", [user.$id])]
    );

    return userFromDatabase.documents[0];
  } catch (error) {
    console.error(error);
  }
};

const getMoods = () => {
  const moods = databases.listDocuments(databaseId!, moodCollectionId!);

  return moods as unknown as { documents: Mood[] };
};

const saveMood = async ({
  mood,
  reason,
}: {
  mood: Mood;
  reason: string | null;
}) => {
  const user = await getUserFromDatabase();

  if (!user) {
    return Error("User not logged in");
  }

  const data = {
    mood: mood.$id,
    reason: reason,
    user: user.$id,
  };

  try {
    const savedMood = await databases.createDocument(
      databaseId!,
      moodsCollectionId!,
      ID.unique(),
      data
    );

    return savedMood;
  } catch (error) {
    console.error(error);
  }
};

export { loginUser, getUser, getMoods, saveMood, addEmailToWaitingList };
export type { Mood };
