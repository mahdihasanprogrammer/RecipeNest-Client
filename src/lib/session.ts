"use server"


import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";



export const getUserSession = async()=>{
     const session = await auth.api.getSession({
    headers: await headers()
})

return (session?.user) 
}

// get token;
export const getSessionToken = async():Promise<string | null>=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (session?.session?.token) || null;
}