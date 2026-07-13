
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const serverMutation = async (path:string, data:any, method:string = 'POST'):Promise<any> =>{

    const res = await fetch(`${baseUrl}${path}`, {
        method:method,
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(data) || {}
    })

    return res.json()
}