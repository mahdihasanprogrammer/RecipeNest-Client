import { redirect } from "next/navigation";
import { getSessionToken } from "../session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

const authHeader = async():Promise<Record<string,string>> =>{
    const token = await getSessionToken();
    return token ? {
        authorization: `Bearer ${token}`
    }: {}

    
}

// 
export const serverFetch = async <TResponse = unknown>(
    path: string,

): Promise<TResponse> => {
    console.log(`${baseUrl}${path}`);
    const res = await fetch(`${baseUrl}${path}`);
    return res.json() as Promise<TResponse>
}


export const protectedFetch = async <TResponse = unknown>(
    path: string,

): Promise<TResponse> => {
    const res = await fetch(`${baseUrl}${path}`,{
        headers:{
            ...await authHeader()
        }
    });
    handleStatusCode(res)
    return res.json() as Promise<TResponse>
}


// 
export const serverMutation = async <TResponse = unknown, TData = unknown>(
    path: string,
    data?: TData,
    method: string = "POST"
): Promise<TResponse> => {

    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...await authHeader()
        },
        body: data !== undefined ? JSON.stringify(data) : undefined,
    });
    handleStatusCode(res)
    return res.json() as Promise<TResponse>;
};

const handleStatusCode = (res:Response) => {
  if (res.status === 401) {
    redirect('/login')
  }
  else if (res.status === 403) {
    redirect('/forbidden')
  }

}