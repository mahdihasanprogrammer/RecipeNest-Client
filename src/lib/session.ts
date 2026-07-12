import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import {TUser} from '@/types/interface'

export const getUserSession = async()=>{
     const session = await auth.api.getSession({
    headers: await headers()
})

return (session?.user as TUser) || null
}