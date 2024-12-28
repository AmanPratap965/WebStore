//node-appwrite sdk
"use server";
import {Client} from "node-appwrite";
import {cookies} from "next/headers";
import {appwriteConfig} from "@/lib/appwrite/config";
import {Account, Databases, Avatars, Storage} from "node-appwrite";
// import { Database } from "lucide-react";
export const createSessionClient=async()=>{
    const client=new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)

    const session=(await cookies()).get("appwrite-session");
    if(!session || !session.value)throw new Error("No session found");
    client.setSession(session.value);

    return {
        get account(){
            return new Account(client); 
        },
        get databases(){
            return new Databases(client);   
        }
    }
}


export const createAdminClient=async()=>{
    const client=new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

    

    return {
        get account(){
            return new Account(client); 
        },
        get databases(){
            return new Databases(client);   
        },
        get storage(){
            return new Storage(client);
        },
        get avatars(){
            return new Avatars(client);
        }
    }
}