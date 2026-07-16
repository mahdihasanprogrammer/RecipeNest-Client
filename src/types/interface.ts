
export interface TUser {
    id?: string,
    name?: string,
    image?: string | null | undefined,
    email: string,
    userRole?: string | undefined,
    createdAt?:Date| string,
    updatedAt?: Date | string,
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
    creatorImage: string,
    createdAt?: string,
    _id?: string
}

export interface TSuccess {
    success: string,
    message: string
}

export interface TContributors{
    creatorId: string,
    creatorName:string,
    creatorEmail: string,
    creatorImage: string,
    contribute: number
}

// chart type sef;
export interface TChartDayData {
  day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  count: number;
}

export interface TUserDashboardStatsResponse {
  totalRecipes: number;
  todayCreated: number;
  totalCuisine: number;
  recentRecipes: TRecipe[];
  chartData: TChartDayData[];
}