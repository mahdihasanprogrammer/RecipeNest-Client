
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const serverFetch = async <TResponse = unknown>(
    path: string,

): Promise<TResponse> => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json() as Promise<TResponse>
}

export const serverMutation = async <TResponse = unknown, TData = unknown>(
    path: string,
    data?: TData,
    method: string = "POST"
): Promise<TResponse> => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: data !== undefined ? JSON.stringify(data) : undefined,
    });

    return res.json() as Promise<TResponse>;
};