
export interface TUser {
    id?: string;
    name?: string;
    image?: string;
    email: string;
    userRole?: string,
    createdAt?: string,
    updatedAt?: string,
    emailVerified?: boolean
}

export interface TRecipe {
    title: string,
    shortDesc: string,
    fullDesc: string,
    cookTime: string,
    servings: string,
    difficulty: string,
    cuisine: string,
    coverImage?: string,
    ingredients: string[],
    steps: string[],
    creatorName: string,
    creatorEmail: string,
    creatorId: string,
    creatorImage: string
}